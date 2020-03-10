import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ParkingsActions } from './parkings.actions';
import { getParkings, createParking, stopParking, checkCostParking } from './parkings.service';
import { ParkingState } from './parkings.reducer';
import { BalanceActions } from '../Balance/balance.actions';
import { NotificationActions } from '../Notification/notification.actions';

export const getParkings$ = (actions$: ActionsObservable<Action<string>>) => {
  return actions$.pipe(
    ofType(ParkingsActions.GetParkings),
    switchMap(() => {
      return getParkings().pipe(
        map(data => ({
          type: ParkingsActions.GetParkingsSuccess,
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

export const createParking$ = (actions$: ActionsObservable<Action<ParkingState>>) => {
  return actions$.pipe(
    ofType(ParkingsActions.CreateParking),
    switchMap(({ payload }) => {
      return createParking(payload).pipe(
        mergeMap(() =>
          of(
            { type: BalanceActions.GetBalance },
            { type: ParkingsActions.GetParkings },
            { type: ParkingsActions.CreateParkingSuccess },
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

export const checkCostParking$ = (actions$: ActionsObservable<Action<ParkingState>>) => {
  return actions$.pipe(
    ofType(ParkingsActions.CheckCostParking),
    switchMap(({ payload }) => {
      return checkCostParking(payload).pipe(
        mergeMap(cost =>
          of({
            type: ParkingsActions.CheckCostParkingSuccess,
            payload: { cost },
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

export const stopParking$ = (actions$: ActionsObservable<Action<{ reservationId: number }>>) => {
  return actions$.pipe(
    ofType(ParkingsActions.StopParking),
    switchMap(({ payload }) => {
      return stopParking(payload).pipe(
        mergeMap(() =>
          of(
            { type: BalanceActions.GetBalance },
            { type: ParkingsActions.GetParkings },
            { type: ParkingsActions.StopParkingSuccess },
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
