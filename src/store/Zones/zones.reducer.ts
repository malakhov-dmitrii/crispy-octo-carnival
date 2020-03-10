import { handleActions } from 'redux-actions';
import { ZonesActions } from './zones.actions';

export interface Zones {
  objects: ZoneObject[];
}

export interface ZoneObject {
  description: Description;
  _id: number;
  active: boolean;
  center: Center;
  location: Location;
  number: string;
  type: string;
  tariff?: Tariff;
  prices?: Price2[];
  objectType: string;
}

interface Price2 {
  vehicleType: string;
  price: Price;
}

interface Price {
  min: number;
  max: number;
}

interface Tariff {
  _id: number;
  name: Description;
  description: Description;
}

interface Location {
  type: string;
  coordinates: number[][][];
}

interface Center {
  type: string;
  coordinates: number[];
}

interface Description {
  ru: string;
  en: string;
}

export interface ZonesState {
  data: {
    items: ZoneObject[];
    total: number;
  };
  isLoading: boolean;
  error: boolean;
}

export const initialState: any = {
  data: [],
  isLoading: false,
  error: false,
};

export default handleActions(
  {
    // --------------- PENDING --------------------------
    [ZonesActions.GetZones](state: any) {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    },

    // --------------- ERROR --------------------------
    [ZonesActions.GetZonesError](state: any) {
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    },

    // --------------- SUCCESS --------------------------
    [ZonesActions.GetZonesSuccess](state: any, { payload: { data } }: any) {
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
