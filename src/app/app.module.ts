import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers } from './store/meta.reducer.ts';
import { reducers } from './store/reducers';
import { effects } from './store/effects';
import { ToastrModule } from 'ngx-toastr';
import { HelpersService } from './services/helpers.service';
import { HttpClientModule } from '@angular/common/http';
import { NewsModule } from './news/news.module';
import { Configuration } from './app.constants';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    // 3rd libs
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added

    // Modules
    NewsModule,

    // Store libs
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    // Services
    Configuration,
    HelpersService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
