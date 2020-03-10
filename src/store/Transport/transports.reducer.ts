import { handleActions } from 'redux-actions';
import { TransportsActions } from './transports.actions';

export interface Transports {
  reservations: TransportsReservation[];
  total: number;
}

export interface TransportsReservation {
  //** Id  записи*/
  id?: number;
  /** Рег. номер автомобиля */
  vrp?: string | null;
  /** Серия и номер СТС */
  sts?: string | null;
  /** Описание */
  description?: string | null;
  /** Тип ТС - авто/грузовик/автобус */
  vehicleType?: string | null;
  /** Местный/инстранный номер */
  vrpFormat?: boolean | null;
}

export interface TransportsState {
  data: TransportsReservation[];
  isLoading: boolean;
  error: boolean;
}

export const initialState: TransportsState = {
  data: [],
  isLoading: false,
  error: false,
};

export default handleActions(
  {
    // --------------- PENDING --------------------------
    [TransportsActions.GetTransports](state: any) {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    },

    // --------------- ERROR --------------------------
    [TransportsActions.GetTransportsError](state: any) {
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    },

    // --------------- SUCCESS --------------------------
    [TransportsActions.GetTransportsSuccess](state: any, { payload: { data } }: any) {
      return {
        ...state,
        error: false,
        isLoading: false,
        data: data,
      };
    },
  },
  initialState,
);
