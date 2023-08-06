import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as newsAction from './news.action';
import { NewsApiService } from '../news.api.service';
import { NewsHubService } from '../news.hub.service';

@Injectable()
export class NewsEffects {
  constructor(
    private actions$: Actions,
    private newsApiService: NewsApiService,
    private newsHubService: NewsHubService,
  ) {}

  sendNewsItemAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newsAction.sendNewsItemAction),
      switchMap(({ payload }) => {
        this.newsHubService.send(payload);
        return of(newsAction.sendNewsItemFinishedAction({ payload }));
      }),
    ),
  );

  joinGroupAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newsAction.joinGroupAction),
      switchMap(({ payload }) => {
        this.newsHubService.joinGroup(payload);
        return of(newsAction.joinGroupFinishedAction({ payload }));
      }),
    ),
  );

  leaveGroupAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newsAction.leaveGroupAction),
      map((action) => action.payload),
      switchMap((payload) => {
        this.newsHubService.leaveGroup(payload);
        return of(newsAction.leaveGroupFinishedAction({ payload }));
      }),
    ),
  );

  selectAllNewsGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newsAction.selectAllNewsGroupsAction),
      switchMap(() =>
        this.newsApiService.getAllGroups().pipe(
          map((payload) =>
            newsAction.selectAllNewsGroupsFinishedAction({ payload }),
          ),
          catchError((error) => of(error)),
        ),
      ),
    ),
  );
}
