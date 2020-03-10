import { handleActions } from 'redux-actions';
import { AbonementsActions } from './abonements.actions';

export interface Item {
  _id: number;
  price: number;
  name: string;
  startType: string;
  zones: any[];
  intervalType: string;
  workingDays: number;
}

export interface AbonementData {
  items: Item[];
  total: number;
}

export interface AbonementState {
  data: AbonementData;
  isLoading: boolean;
  error: boolean;
}

export const initialState: any = {
  data: {
    items: [],
    total: 0,
  },
  isLoading: false,
  error: false,
};

export default handleActions(
  {
    // --------------- PENDING --------------------------
    [AbonementsActions.GetAbonements](state: any) {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    },

    // --------------- ERROR --------------------------
    [AbonementsActions.GetAbonementsError](state: any) {
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    },

    // --------------- SUCCESS --------------------------
    [AbonementsActions.GetAbonementsSuccess](state: any, { payload: { data } }: any) {
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
