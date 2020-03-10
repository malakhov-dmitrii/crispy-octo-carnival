import { map } from 'rxjs/operators';
import { restClient } from '../restClient';

export const getAbonements = () => {
  return restClient({
    method: 'GET',
    url: `/legalcabinet/api/v1/abonements`,
  }).pipe(map(({ data }) => data));
};
