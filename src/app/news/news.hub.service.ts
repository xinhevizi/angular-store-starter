import { Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { NewsItem } from './models/news-item';
import { Store } from '@ngrx/store';
import * as newsAction from './store/news.action';
import { Configuration } from '../app.constants';
import * as signalR from '@microsoft/signalr';
import { HubRoutes, NewsHubActions } from './hub.const';

@Injectable()
export class NewsHubService {
  private hubConnection: HubConnection | undefined;

  constructor(
    private store: Store<any>,
    private configuration: Configuration,
  ) {
    console.warn('NewsHubService.constructor');
    this.initHub();
  }

  send(newsItem: NewsItem): NewsItem {
    if (this.hubConnection) {
      this.hubConnection.invoke(NewsHubActions.Send, newsItem);
    }
    return newsItem;
  }

  joinGroup(group: string): void {
    if (this.hubConnection) {
      this.hubConnection.invoke(NewsHubActions.JoinGroup, group);
    }
  }

  leaveGroup(group: string): void {
    if (this.hubConnection) {
      this.hubConnection.invoke(NewsHubActions.LeaveGroup, group);
    }
  }

  private initHub() {
    console.warn('NewsHubService.initHub');

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.configuration.Server}/${HubRoutes.News}`)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection.start().catch((err) => console.error(err.toString()));

    this.hubConnection.on(NewsHubActions.Send, (newsItem: NewsItem) => {
      this.store.dispatch(
        newsAction.receiveNewsItemAction({ payload: newsItem }),
      );
    });

    this.hubConnection.on(NewsHubActions.JoinGroup, (data: string) => {
      // Debug
      // console.log('received data from the hub');
      // console.log(data);
      this.store.dispatch(
        newsAction.receiveGroupJoinedAction({ payload: data }),
      );
    });

    this.hubConnection.on(NewsHubActions.LeaveGroup, (data: string) => {
      this.store.dispatch(newsAction.receiveGroupLeftAction({ payload: data }));
    });

    this.hubConnection.on(NewsHubActions.History, (newsItems: NewsItem[]) => {
      // Debug
      // console.log('received history from the hub');
      // console.log(newsItems);
      this.store.dispatch(
        newsAction.receiveNewsGroupHistoryAction({ payload: newsItems }),
      );
    });
  }
}
