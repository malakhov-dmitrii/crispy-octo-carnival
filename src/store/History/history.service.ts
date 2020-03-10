import { map } from 'rxjs/operators';
import { restClient } from '../restClient';

export const getHistory = (payload: any) => {
  return restClient({
    method: 'GET',
    params: payload,
    url: `/legalcabinet/api/v1/operations`,
  }).pipe(map(({ data }) => data));
};

export const downloadHistory = (payload: any) => {
  return restClient({
    method: 'GET',
    params: payload,
    url: `/export/2.39/accounts/me/payments`,
  }).pipe(
    map(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', response.headers['content-disposition'].split('=')[1]);
      link.click();
    }),
  );
};
