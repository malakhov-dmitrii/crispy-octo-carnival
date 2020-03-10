import { map } from 'rxjs/operators';
import { restClient } from '../restClient';
import { AuthConfig } from '../Config/config.reducer';
import { of } from 'rxjs';

// export const getOrgProfile = () => {
//     return Axios.request({
//         method: 'GET',
//         url: `PASTE_URL_HERE`
//     }).pipe(
//         map(({ data }) => data)
//     );
// };

export const getOrgProfile = () => {
  const authStr = localStorage.getItem('auth');

  if (authStr) {
    const auth: AuthConfig = JSON.parse(authStr);

    return restClient({
      method: 'GET',
      url: `/legalcabinet/api/v1/legal-entities/${auth.legalEntityId}`,
    }).pipe(map(({ data }) => data.item));
  }

  return of(null);
};
