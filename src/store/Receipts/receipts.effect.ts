import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { ReceiptsActions } from './receipts.actions';
import { OrganizationWrapperActions } from '../OrganizationWrapper/organizationWrapper.actions';
import { getReceipts, createReceipts, downloadReceipts, sendInvoiceReceipts } from './receipts.service';
import { NotificationActions } from '../Notification/notification.actions';

export const getReceipts$ = (actions$: ActionsObservable<Action<string>>) => {
  return actions$.pipe(
    ofType(ReceiptsActions.GetReceipts),
    switchMap(() => {
      return getReceipts().pipe(
        map(data => ({
          type: ReceiptsActions.GetReceiptsSuccess,
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

export const createReceipts$ = (actions$: ActionsObservable<Action<any>>) => {
  return actions$.pipe(
    ofType(ReceiptsActions.CreateReceipts),
    switchMap(({ payload }: any) => {
      return createReceipts(payload).pipe(
        mergeMap(data =>
          of(
            {
              type: ReceiptsActions.CreateReceiptsSuccess,
            },
            {
              type: OrganizationWrapperActions.CreateCheck,
              payload: data.item,
            },
            {
              type: ReceiptsActions.GetReceipts,
            },
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

export const sendInvoiceReceipts$ = (
  actions$: ActionsObservable<Action<{ receiptId: number; data: { email: string } }>>,
) => {
  return actions$.pipe(
    ofType(ReceiptsActions.SendInvoiceReceipts),
    switchMap(({ payload }: any) => {
      return sendInvoiceReceipts(payload).pipe(
        map(() => ({
          type: ReceiptsActions.SendInvoiceReceiptsSuccess,
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

export const downloadReceipts$ = (actions$: ActionsObservable<Action<{ id: number; type: string }>>) => {
  return actions$.pipe(
    ofType(ReceiptsActions.DownloadReceipts),
    switchMap(({ payload }: any) => {
      const { id, type } = payload;

      return downloadReceipts({ id, type }).pipe(
        map(() => ({
          type: ReceiptsActions.DownloadReceiptsSuccess,
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
