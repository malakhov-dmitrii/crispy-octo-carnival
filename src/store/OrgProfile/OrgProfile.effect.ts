import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrgProfileActions } from './OrgProfile.actions';
import { getOrgProfile } from './OrgProfile.service';
import { NotificationActions } from '../Notification/notification.actions';

export const getOrgProfile$ = (actions$: ActionsObservable<Action<string>>) => {
  return actions$.pipe(
    ofType(OrgProfileActions.GetOrgProfile),
    switchMap(() => {
      return getOrgProfile().pipe(
        map(data => ({
          type: OrgProfileActions.GetOrgProfileSuccess,
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
