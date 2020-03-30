// import { map } from 'rxjs/operators';
// import { AuthConfig } from '../Config/config.reducer';
import { of } from 'rxjs';
import limitSets from '../mocks/limitCase.json';
// import { restClient } from '../restClient';

export const getLimitSetsActions = () => {
  return of(limitSets);
  // const authStr = localStorage.getItem('auth');
  // if (authStr) {
  //   const auth: AuthConfig = JSON.parse(authStr);

  //   return restClient({
  //     method: 'GET',
  //     url: `/legalcabinet/api/v1/legal-entities/${auth.legalEntityId}/limit-sets`,
  //   }).pipe(map(({ data }) => data.balance));
  // }
  // return of(null);
};
