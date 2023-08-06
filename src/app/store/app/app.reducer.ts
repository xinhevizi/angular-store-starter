import { createReducer, on } from '@ngrx/store';
import { AppActions } from './app.actions';
import { AppState } from './app.state';

const initialState = {} as AppState;

export const appReducer = createReducer(
  initialState,
  on(AppActions.pushNotification, (state, { notify }) => ({
    ...state,
    notify: notify,
  })),
);
