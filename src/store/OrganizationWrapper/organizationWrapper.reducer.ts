import { handleActions } from 'redux-actions';
import { OrganizationWrapperActions } from './organizationWrapper.actions';

export interface Check {
  _id: number;
  createDate: string;
  sum: number;
}

export interface OrganizationWrapperState {
  data: {
    check?: Check;
  };
  isLoading: boolean;
  error: boolean;
}

export const initialState: OrganizationWrapperState = {
  data: {},
  isLoading: false,
  error: false,
};

export default handleActions(
  {
    // --------------- PENDING --------------------------
    [OrganizationWrapperActions.CreateCheck](state: any) {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    },

    // --------------- ERROR --------------------------
    [OrganizationWrapperActions.CreateCheckError](state: any) {
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    },

    // --------------- SUCCESS --------------------------
    [OrganizationWrapperActions.CreateCheckSuccess](state: any, { payload }: any) {
      return {
        ...state,
        error: false,
        isLoading: false,
        data: {
          ...state.data,
          check: payload,
        },
      };
    },
  },
  initialState,
);
