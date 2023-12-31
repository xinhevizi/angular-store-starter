import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NewsApiService } from './news.api.service';
import { NewsHubService } from './news.hub.service';
import { NewsComponent } from './components/news.component';
import { NewsRoutes } from './news.routes';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NewsEffects } from './store/news.effects';
import { newsReducer } from './store/news.reducer';
import { newsStoreName } from './store/news.selectors';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NewsRoutes,
    StoreModule.forFeature(newsStoreName, newsReducer),
    EffectsModule.forFeature([NewsEffects]),
  ],

  declarations: [NewsComponent],

  providers: [NewsApiService, NewsHubService],

  exports: [NewsComponent],
})
export class NewsModule {}
