import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { ConfigActions } from './config.actions';
import { LegalEntitiesActions } from '../LegalEntities/legalEntities.actions';
import { getConfig } from './config.service';
import { getFromOneTimeToken, getActiveOrganizationAccessToken } from './config.service';
import { AuthConfig } from './config.reducer';
import { NotificationActions } from '../Notification/notification.actions';

export const getFromOneTimeToken$ = (actions$: ActionsObservable<Action<string>>) => {
  return actions$.pipe(
    ofType(ConfigActions.GetFromOneTimeToken),
    switchMap(({ payload }) => {
      return getFromOneTimeToken(payload).pipe(
        mergeMap((data: AuthConfig) =>
          of(
            {
              type: ConfigActions.GetFromOneTimeTokenSuccess,
              payload: { data },
            },
            { type: LegalEntitiesActions.GetLegalEntities },
          ),
        ),
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

export const getActiveOrganizationAccessToken$ = (
  actions$: ActionsObservable<Action<{ refreshToken: string; legalEntityExternalId: number }>>,
) => {
  return actions$.pipe(
    ofType(ConfigActions.GetActiveOrganiztionAccessToken),
    switchMap(({ payload }) => {
      const { legalEntityExternalId, refreshToken } = payload;
      return getActiveOrganizationAccessToken(refreshToken, legalEntityExternalId).pipe(
        mergeMap((data: AuthConfig) =>
          of({
            type: ConfigActions.GetActiveOrganiztionAccessTokenSuccess,
            payload: { data },
          }),
        ),
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

export const getConfig$ = (actions$: ActionsObservable<Action<string>>) => {
  return actions$.pipe(
    ofType(ConfigActions.GetConfig),
    switchMap(() => {
      return getConfig().pipe(
        map(data => ({
          type: ConfigActions.GetConfigSuccess,
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
