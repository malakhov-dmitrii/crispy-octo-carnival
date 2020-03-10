import { Check } from './organizationWrapper.reducer';
import { of } from 'rxjs';

export const createCheck = (data: Check) => {
  return of(data);
};
