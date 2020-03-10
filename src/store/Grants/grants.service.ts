import { map } from 'rxjs/operators';
import { restClient } from '../restClient';

export const getGrants = () => {
  return restClient({
    method: 'GET',
    url: `https://parkingqa2.fitdev.ru/legalcabinet/api/v1/grants`,
  }).pipe(map(({ data }) => data));
};
