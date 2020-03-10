import { map } from 'rxjs/operators';
import { AuthConfig } from '../Config/config.reducer.js';
import { of } from 'rxjs';
import { restClient } from '../restClient';

export const getTransports = () => {
  const authStr = localStorage.getItem('auth');

  if (authStr) {
    const auth: AuthConfig = JSON.parse(authStr);

    return restClient({
      method: 'GET',
      url: `/legalcabinet/api/v1/legal-entities/${auth.legalEntityId}/vehicles`,
    }).pipe(map(({ data }) => data));
  }
  return of(null);
};
