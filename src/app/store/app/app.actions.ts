import { createActionGroup, props } from '@ngrx/store';
import { Notify } from 'src/app/models/notify';

export const AppActions = createActionGroup({
  source: 'App',
  events: {
    'Push Notification': props<{ notify: Notify }>(),
  },
});
