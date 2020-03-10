import { map, timeout, mergeMap } from 'rxjs/operators';
import { AuthConfig } from '../Config/config.reducer';
import { of, Observable } from 'rxjs';
import Axios from 'axios-observable';

export const restClient = (props: any): Observable<any> => {
  const { data, headers, params, method, url } = props;
  const localAuth: AuthConfig = JSON.parse(localStorage.getItem('auth') || 'null');

  //если токена не существует, откладываем запрос на N время
  if (!localAuth)
    return of(1).pipe(
      timeout(1000),
      mergeMap(() => restClient(props)),
    );

  // rh.request(props, (res: any) => {
  //   console.log('Request completed', res);
  // });

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

export const getBalance = () => {
  const authStr = localStorage.getItem('auth');
  if (authStr) {
    const auth: AuthConfig = JSON.parse(authStr);

    return restClient({
      method: 'GET',
      url: `/legalcabinet/api/v1/legal-entities/${auth.legalEntityId}/balance`,
    }).pipe(map(({ data }) => data.balance));
  }
  return of(null);
};
