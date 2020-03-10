import { map } from 'rxjs/operators';
import { restClient } from '../restClient';
import { of } from 'rxjs/index';
import { AuthConfig } from '../Config/config.reducer';

export const getLegalEntities = () => {
  const authStr = localStorage.getItem('auth');

  if (authStr) {
    const auth: AuthConfig = JSON.parse(authStr);

    return restClient({
      method: 'GET',
      url: `/legalcabinet/api/v1/employees/${auth.employeeId}/available-legal-entities`,
    }).pipe(map(({ data }) => data.items));
  } else return of(null);
};

export const updateLegalEntities = (props: any) => {
  const authStr = localStorage.getItem('auth');

  if (authStr) {
    const auth: AuthConfig = JSON.parse(authStr);

    return restClient({
      method: 'PUT',
      data: props,
      url: `/api/v1/legal-entities/${auth.legalEntityId}/set-legal-entity-info`,
    }).pipe(map(({ data }) => data.items));
  } else return of(null);
};

export const createChiefRequest = (payload: any) => {
  const authStr = localStorage.getItem('auth');

  if (authStr) {
    const auth: AuthConfig = JSON.parse(authStr);

    return restClient({
      headers: {
        'content-type': 'multipart/form-data;',
      },
      method: 'PUT',
      data: payload,
      url: `/legalcabinet/api/v1/legal-entities/${auth.legalEntityId}/create-chief-request`,
    }).pipe(map(({ data }) => data.item));
  } else return of(null);
};

export const setChiegetLegalEntitiesRequest = (payload: any) => {
  const authStr = localStorage.getItem('auth');

  if (authStr) {
    const auth: AuthConfig = JSON.parse(authStr);

    return restClient({
      headers: {
        'content-type': 'multipart/form-data;',
      },
      method: 'PUT',
      data: payload,
      url: `/legalcabinet/api/v1/legal-entities/${auth.legalEntityId}/create-chief-request`,
    }).pipe(map(({ data }) => data.item));
  } else return of(null);
};
