import { map } from 'rxjs/operators';
import { restClient } from '../restClient';
import { ParkingState } from './parkings.reducer';
import rh from '../requestHandler';

export const getParkings = () => {
  const props = {
    method: 'GET',
    url: `/legalcabinet/api/v1/reservations`,
  };

  rh.request(
    {
      method: 'GET',
      url: `/legalcabinet/api/v1/reservations`,
    },
    () => {
      // console.log('Request completed', res);
    },
  );

  return restClient(props).pipe(map(({ data }) => data));
};

export const createParking = (props: ParkingState) => {
  return restClient({
    data: { ...props },
    method: 'POST',
    url: `/legalcabinet/api/v1/reservations`,
  }).pipe(map(({ data }) => data));
};

export const checkCostParking = (props: ParkingState) => {
  return restClient({
    params: props,
    method: 'GET',
    url: `/legalcabinet/api/v1/reservations/cost`,
  }).pipe(map(({ data }) => data));
};

export const stopParking = ({ reservationId }: { reservationId: number }) => {
  return restClient({
    method: 'PUT',
    url: `/legalcabinet/api/v1/reservations/${reservationId}/cancel`,
  }).pipe(map(({ data }) => data));
};
