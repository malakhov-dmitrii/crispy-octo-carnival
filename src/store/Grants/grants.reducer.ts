import { handleActions } from 'redux-actions';
import { GrantsActions } from './grants.actions';

export interface Grants {
  _id: number;
  benefitId: number;
  start: string;
  end: string;
  benefitName: string;
  vrp: string;
  zoneNumbers: string[];
}

export interface GrantsState {
  data: {
    items: Grants[];
    total: number;
  };
  isLoading: boolean;
  error: boolean;
}

export const initialState: GrantsState = {
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
    [GrantsActions.GetGrants](state: any) {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    },

    // --------------- ERROR --------------------------
    [GrantsActions.GetGrantsError](state: any) {
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    },

    // --------------- SUCCESS --------------------------
    [GrantsActions.GetGrantsSuccess](state: any, { payload: { data } }: any) {
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
