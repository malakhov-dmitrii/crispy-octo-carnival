import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, switchMap, delay } from 'rxjs/operators';
import { TransportsActions } from './transports.actions';
import { getTransports } from './transports.service';
import { NotificationActions } from '../Notification/notification.actions';

export const getTransports$ = (actions$: ActionsObservable<Action<string>>) => {
  return actions$.pipe(
    ofType(TransportsActions.GetTransports),
    delay(3000),
    switchMap(() => {
      return getTransports().pipe(
        map(data => {
          return {
            type: TransportsActions.GetTransportsSuccess,
            payload: { data },
          };
        }),
        catchError(error => {
          const message = error?.response?.data?.userMessage || 'Неизвестная ошибка';

          return of({
            type: NotificationActions.PushNotification,
            payload: {
              message,
              type: 'error',
            },
          });
        }),
      );
    }),
  );
};
