import { handleActions } from 'redux-actions';
import { BalanceActions } from './balance.actions';

export interface BalanceState {
  balance: number;
  isLoading: boolean;
  error: boolean;
}

export const initialState: BalanceState = {
  balance: 0,
  isLoading: false,
  error: false,
};

export default handleActions(
  {
    // --------------- PENDING --------------------------
    [BalanceActions.GetBalance](state: any) {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    },

    // --------------- ERROR --------------------------
    [BalanceActions.GetBalanceError](state: any) {
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    },

    // --------------- SUCCESS --------------------------
    [BalanceActions.GetBalanceSuccess](state: any, { payload: { data } }: any) {
      return {
        ...state,
        error: false,
        isLoading: false,
        balance: data,
      };
    },
  },
  initialState,
);
