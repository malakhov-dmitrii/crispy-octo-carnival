import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AbonementsActions } from './abonements.actions';
import { getAbonements } from './abonements.service';
import { NotificationActions } from '../Notification/notification.actions';

export const getAbonements$ = (actions$: ActionsObservable<Action<string>>) => {
  return actions$.pipe(
    ofType(AbonementsActions.GetAbonements),
    switchMap(() => {
      return getAbonements().pipe(
        map(data => ({
          type: AbonementsActions.GetAbonementsSuccess,
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
