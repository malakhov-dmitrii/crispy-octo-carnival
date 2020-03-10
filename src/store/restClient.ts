import { Observable, of } from 'rxjs';
import Axios from 'axios-observable';
import { AuthConfig } from './Config/config.reducer';
import { timeout, mergeMap } from 'rxjs/operators';

export const restClient = (props: any): Observable<any> => {
  const { data, headers, params, method, url } = props;
  const localAuth: AuthConfig = JSON.parse(localStorage.getItem('auth') || 'null');

  //если токена не существует, откладываем запрос на N время
  if (!localAuth)
    return of(1).pipe(
      timeout(1000),
      mergeMap(() => restClient(props)),
    );

  return Axios.request({
    data, // при использовании spread оператора FormData не передается
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${localAuth.accessToken}`,
      ...headers,
    },
    params,
    method,
    url,
  });
  // catchError((err: any) => {
  //   if (err.response.status === 401 && err.response.data.errorName === "TokenExpiredError") {
  //     localStorage.setItem('accessToken', 'null');
  //     return restClient(props);
  //   }

  //   return throwError(err);
  // }),
};

/**
 * 1. /api/v1/auth/login --------- oneTimeToken из ЕСИА --------- ловим на странице для токена ---------
 * 2. Переходим к странице выбора организаций --------- отправляем запрос --------- /api/v1/auth/token
 *
 *  ---------  Кладем в стор   ---------
 *   {
        "employeeId": "12345678901234567890abcd",
        "legalEntityId": "12345678901234567890abcd",
        "roles": [
          "employee"
        ],
        "accessToken": "526e2b0076659cce.d3eda0be88ce52fc.326e293c",
        "refreshToken": "526e2b0076659cce.d3eda0be88ce52fc.326e293c"
      }
 ---------------------------------------------
 *
 * 3. Получаем список доступных организаций --------- /api/v1/employees/{employeeId}/available-legal-entities
 *    3.1 Кладем список в стор
 *
 * 4. При выборе организации - кладем в стор ID выбранной.
 *
 * -----------------------------------------------------------------
 * 5. Обновляем токен для работы с выбранной организацией --------- отправляем запрос --------- /api/v1/auth/token с refreshToken и ID
 *
 *    Обновляем стор с токенами + приходит ID организации для доступа к ее ресурсам
 *
 * -----------------------------------------------------------------
 *
 * 5. Работаем с организацией
 *
 * 6. Если токен протух - обычный рефреш.
 *
 *
 *
 *
 */
