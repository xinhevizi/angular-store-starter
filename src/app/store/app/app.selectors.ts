import { createSelector, createFeatureSelector } from '@ngrx/store';
import { REDUCER_KEYS } from '../reducer.keys.enum';
import { AppState } from './app.state';

export const selectAppState = createFeatureSelector<AppState>(REDUCER_KEYS.APP);

export const selectNotify = createSelector(
  selectAppState,
  (state: AppState) => state.notify,
);
