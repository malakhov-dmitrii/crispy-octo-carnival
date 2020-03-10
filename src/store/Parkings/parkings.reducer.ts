import { handleActions, combineActions } from 'redux-actions';
import { ParkingsActions } from './parkings.actions';

export interface ParkingReservation {
  _id: number;
  sum: number;
  zoneNumber: string;
  accountId: number;
  start: number;
  end: number;
  vrp: string;
  vehicleType: string;
  vrpFormat: string;
  transactionId: number;
  renewable: boolean;
  updatable: boolean;
  cancelled: boolean;
  cancelDate?: any;
  renewed: boolean;
  remainingTime: number;
}

export interface ParkingsState {
  data: {
    items: ParkingReservation[];
    total: number;
    cost: any;
  };
  isLoading: boolean;
  error: boolean;
}

export interface ParkingState {
  zoneNumber: string;
  vrp: string;
  vehicleType: string;
  vrpFormat: string;
  duration: string;
}

export const initialState: ParkingsState = {
  data: {
    items: [],
    total: 0,
    cost: null,
  },
  isLoading: false,
  error: false,
};

const errorActions: any = combineActions(
  ParkingsActions.GetParkingsError,
  ParkingsActions.CreateParkingError,
  ParkingsActions.StopParkingError,
  ParkingsActions.CheckCostParkingError,
);

const pendingActions: any = combineActions(
  ParkingsActions.GetParkings,
  ParkingsActions.StopParking,
  ParkingsActions.CreateParking,
  ParkingsActions.CheckCostParking,
);

const successActions: any = combineActions(ParkingsActions.CreateParkingSuccess, ParkingsActions.StopParkingSuccess);

export default handleActions(
  {
    // --------------- PENDING --------------------------
    [pendingActions](state: any) {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    },

    // --------------- ERROR --------------------------
    [errorActions](state: any) {
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    },

    // --------------- SUCCESS --------------------------
    [ParkingsActions.GetParkingsSuccess](state: any, { payload }: any) {
      return {
        ...state,
        error: false,
        isLoading: false,
        ...payload,
      };
    },
    [ParkingsActions.CheckCostParkingSuccess](state: any, { payload }: any) {
      return {
        ...state,
        data: { ...state.data, ...payload },
        error: false,
        isLoading: false,
      };
    },
    [successActions](state: any) {
      return {
        ...state,
        error: false,
        isLoading: false,
      };
    },
  },
  initialState,
);
