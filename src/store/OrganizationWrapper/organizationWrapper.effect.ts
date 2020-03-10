import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrganizationWrapperActions } from './organizationWrapper.actions';
import { createCheck } from './organizationWrapper.service';
import { Check } from './organizationWrapper.reducer';
import { NotificationActions } from '../Notification/notification.actions';

export const createCheck$ = (actions$: ActionsObservable<Action<Check>>) => {
  return actions$.pipe(
    ofType(OrganizationWrapperActions.CreateCheck),
    switchMap(({ payload }) => {
      return createCheck(payload).pipe(
        map(payload => ({
          type: OrganizationWrapperActions.CreateCheckSuccess,
          payload,
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
