import { map } from 'rxjs/operators';
import Axios from 'axios-observable';

export const getConfig = () => {
  return Axios.request({
    headers: {
      'content-type': 'application/json',
    },
    method: 'GET',
    url: `/legalcabinet/api/v1/config`,
  }).pipe(map(({ data }) => data));
};

export const getFromOneTimeToken = (oneTimeToken: string) => {
  return Axios.request({
    data: {
      oneTimeToken,
    },
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    url: `/legalcabinet/api/v1/auth/token`,
  }).pipe(
    map(({ data }) => {
      localStorage.setItem('auth', JSON.stringify(data));
      return data;
    }),
  );
};

export const getActiveOrganizationAccessToken = (refreshToken: string, legalEntityExternalId: number) => {
  return Axios.request({
    data: {
      refreshToken,
      legalEntityExternalId,
    },
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    url: `/legalcabinet/api/v1/auth/token`,
  }).pipe(
    map(({ data }) => {
      localStorage.setItem('auth', JSON.stringify(data));
      return data;
    }),
  );
};
