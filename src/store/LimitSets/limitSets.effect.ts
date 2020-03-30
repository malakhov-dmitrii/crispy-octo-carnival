import { Action } from 'redux-actions';
import { ActionsObservable, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LimitSetsActions } from './limitSets.actions';
import { getLimitSetsActions } from './limitSets.service';

export const getLimitSetsActions$ = (actions$: ActionsObservable<Action<string>>) => {
  return actions$.pipe(
    ofType(LimitSetsActions.GetLimitSets),
    switchMap(() => {
      return getLimitSetsActions().pipe(
        map(data => ({
          type: LimitSetsActions.GetLimitSetsSuccess,
          payload: { data },
        })),
        catchError(error => {
          const message = error?.response?.data?.userMessage || 'Неизвестная ошибка';

          return of({
            type: LimitSetsActions.GetLimitSetsError,
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
