import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LegalEntitiesActions } from './legalEntities.actions';
import { getLegalEntities, createChiefRequest, updateLegalEntities } from './legalEntities.service';
import { NotificationActions } from '../Notification/notification.actions';

export const getLegalEntities$ = (actions$: ActionsObservable<Action<string>>) => {
  return actions$.pipe(
    ofType(LegalEntitiesActions.GetLegalEntities),
    switchMap(() => {
      return getLegalEntities().pipe(
        map(data => ({
          type: LegalEntitiesActions.GetLegalEntitiesSuccess,
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

export const updateLegalEntities$ = (actions$: ActionsObservable<Action<any>>) => {
  return actions$.pipe(
    ofType(LegalEntitiesActions.UpdateLegalEntities),
    switchMap(({ payload }) => {
      return updateLegalEntities(payload).pipe(
        map(data => ({
          type: LegalEntitiesActions.UpdateLegalEntitiesSuccess,
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

export const createChiefRequest$ = (actions$: ActionsObservable<Action<string>>) => {
  return actions$.pipe(
    ofType(LegalEntitiesActions.CreateChiefRequest),
    switchMap(({ payload }) => {
      return createChiefRequest(payload).pipe(
        map(data => ({
          type: LegalEntitiesActions.CreateChiefRequestSuccess,
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
