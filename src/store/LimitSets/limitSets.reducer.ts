import { handleActions } from 'redux-actions';
import { LimitSetsActions } from './limitSets.actions';

export interface MoneyLimit {
  daily: number;
}

export interface TimeInterval {
  startTime: number;
  endTime: number;
}

export interface Schedule {
  daysOfWeek: number[];
  timeInterval: TimeInterval;
}

export interface Item {
  _id: string;
  legalEntityId: string;
  title: string;
  vehiclesLimited: boolean;
  zoneNumbers: string[];
  moneyLimits: MoneyLimit;
  schedule: Schedule;
  createDate: string;
  updateDate: string;
}

export interface LimitSetsState {
  data: {
    items: Item[];
    total: number;
  };
  isLoading: boolean;
  error: boolean;
}

export const initialState: LimitSetsState = {
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
    [LimitSetsActions.GetLimitSets](state: any) {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    },

    // --------------- ERROR --------------------------
    [LimitSetsActions.GetLimitSetsError](state: any) {
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    },

    // --------------- SUCCESS --------------------------
    [LimitSetsActions.GetLimitSetsSuccess](state: any, { payload: { data } }: any) {
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
