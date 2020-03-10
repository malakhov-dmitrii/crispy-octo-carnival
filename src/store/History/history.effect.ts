import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, switchMap, debounceTime } from 'rxjs/operators';
import { HistoryActions } from './history.actions';
import { getHistory, downloadHistory } from './history.service';
import { NotificationActions } from '../Notification/notification.actions';

export const getHistory$ = (actions$: ActionsObservable<Action<string>>) => {
  return actions$.pipe(
    ofType(HistoryActions.GetHistory),
    debounceTime(500),
    switchMap(({ payload }) => {
      return getHistory(payload).pipe(
        map(data => ({
          type: HistoryActions.GetHistorySuccess,
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

export const downloadHistory$ = (actions$: ActionsObservable<Action<string>>) => {
  return actions$.pipe(
    ofType(HistoryActions.DownloadHistory),
    debounceTime(500),
    switchMap(({ payload }) => {
      return downloadHistory(payload).pipe(
        map(data => ({
          type: HistoryActions.DownloadHistorySuccess,
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
