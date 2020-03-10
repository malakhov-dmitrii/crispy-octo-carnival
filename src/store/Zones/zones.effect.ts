import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ZonesActions } from './zones.actions';
import { getZones } from './zones.service';
import { NotificationActions } from '../Notification/notification.actions';

export const getZones$ = (actions$: ActionsObservable<Action<string>>) => {
  return actions$.pipe(
    ofType(ZonesActions.GetZones),
    switchMap(() => {
      return getZones().pipe(
        map(data => ({
          type: ZonesActions.GetZonesSuccess,
          payload: { data },
        })),
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
