import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BalanceActions } from './balance.actions';
import { getBalance } from './balance.service';
import { NotificationActions } from '../Notification/notification.actions';

export const getBalance$ = (actions$: ActionsObservable<Action<string>>) => {
  return actions$.pipe(
    ofType(BalanceActions.GetBalance),
    switchMap(() => {
      return getBalance().pipe(
        map(data => ({
          type: BalanceActions.GetBalanceSuccess,
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
