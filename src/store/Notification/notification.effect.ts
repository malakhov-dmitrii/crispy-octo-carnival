import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { NotificationActions } from './notification.actions';
import { OpenNotification } from './notification.reducer';

export const pushNotification$ = (actions$: ActionsObservable<Action<OpenNotification>>) => {
  return actions$.pipe(
    ofType(NotificationActions.PushNotification),
    switchMap(({ payload }) => {
      return of(null).pipe(
        map(() => ({
          type: NotificationActions.PushNotificationEntitiesSuccess,
          payload,
        })),
        catchError(error => {
          const message = JSON.parse(JSON.stringify(error)).message || 'Неизвестная ошибка';
          return of({
            type: NotificationActions.PushNotification,
            payload: { error: message },
          });
        }),
      );
    }),
  );
};

export const shiftNotification$ = (actions$: ActionsObservable<Action<any>>) => {
  return actions$.pipe(
    ofType(NotificationActions.ShiftNotification),
    switchMap(() => {
      return of(null).pipe(
        map(() => ({
          type: NotificationActions.ShiftNotificationEntitiesSuccess,
        })),
        catchError(error => {
          const message = JSON.parse(JSON.stringify(error)).message || 'Неизвестная ошибка';
          return of({
            type: NotificationActions.ShiftNotificationEntitiesError,
            payload: { error: message },
          });
        }),
      );
    }),
  );
};
