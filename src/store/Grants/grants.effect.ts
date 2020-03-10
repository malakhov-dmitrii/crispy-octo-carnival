import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { GrantsActions } from './grants.actions';
import { getGrants } from './grants.service';
import { NotificationActions } from '../Notification/notification.actions';

export const getGrants$ = (actions$: ActionsObservable<Action<string>>) => {
  return actions$.pipe(
    ofType(GrantsActions.GetGrants),
    switchMap(() => {
      return getGrants().pipe(
        map(data => ({
          type: GrantsActions.GetGrantsSuccess,
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
