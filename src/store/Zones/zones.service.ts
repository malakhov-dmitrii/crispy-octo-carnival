import { map } from 'rxjs/operators';
import { restClient } from '../restClient';

export const getZones = () => {
  return restClient({
    method: 'GET',
    url: `/legalcabinet/api/v1/zones`,
  }).pipe(map(({ data }) => data));
};
