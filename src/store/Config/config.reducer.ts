import { handleActions } from 'redux-actions';
import { ConfigActions } from './config.actions';

export interface Locale {
  ru: string;
  en: string;
}

export interface Geocode {
  country: string;
  city: string;
}

export interface Location {
  coordinates: number[];
  type: string;
}

export interface Locales {
  name: Locale;
  geocode: Geocode;
  zoom: number;
  location: Location;
}

export interface Phone {
  number: string;
  title: Locale;
}

export interface Contacts {
  phone: Phone;
  additionalPhone: Phone;
}

export enum VehicleTypeNames {
  'car',
  'motorcycle',
  'truck',
  'bus',
}

export interface VehicleTypes {
  name: VehicleTypeNames;
  title: Locale;
}

export interface Notification {
  email: boolean;
  sms?: boolean;
  push?: boolean;
}

export interface Notifications {
  abonementGrantCreate: Notification;
  abonementGrantEnd: Notification;
  benefitGrantCreate: Notification;
  benefitGrantEnd: Notification;
  monthPaymentsReport: Notification;
  fineCreate: Notification;
  evacuations: Notification;
  parkingCheck: Notification;
}

export interface Features {
  allowPastReservation: boolean;
  gatedParkingPayment: boolean;
  finesFind: boolean;
  expandGrants: boolean;
  notifications: Notifications;
}

export interface ZoneTypeOptions {
  tariffs?: boolean;
  benefits?: boolean;
  payments?: boolean;
  fines?: boolean;
}

export interface ZoneTypeTargetsHash {
  simple: ZoneTypeOptions;
  withPermission: ZoneTypeOptions;
  private: ZoneTypeOptions;
  gated: ZoneTypeOptions;
  closed: ZoneTypeOptions;
}

export interface Feedback {
  subjects: Locale[];
}

export interface VrpRegexpsOptions {
  pattern: string;
  flags: string;
}

export interface VrpRegexpsLocal {
  car: VrpRegexpsOptions;
  motorcycle: VrpRegexpsOptions;
  truck: VrpRegexpsOptions;
  bus: VrpRegexpsOptions;
}

export interface VrpRegexps {
  local: VrpRegexpsLocal;
  foreign: VrpRegexpsOptions;
}

export interface Config {
  city: string;
  langs: string[];
  timezone: string;
  minRefillSum: number;
  regionCode: string;
  minReservationTime: number;
  maxReservationTime: number;
  reservationTimeStep: number;
  currency: string;
  pastMinReservationTime: number;
  pastReservationTimeStep: number;
  locales: Locales[];
  contacts: Contacts;
  vehicleTypes: VehicleTypes[];
  features: Features;
  zoneTypeTargetsHash: ZoneTypeTargetsHash;
  feedback: Feedback;
  vrpRegexps: VrpRegexps;
}

export interface AuthConfig {
  employeeId: string;
  legalEntityId?: string;
  roles: string[];
  accessToken: string;
  refreshToken: string;
}

export interface ConfigState {
  data: Config | null;
  auth: AuthConfig | null;
  activeOrganizationId: string | null;
  activeOrganizationExternalId: string | null;
  isOrganizationTokenLoading: boolean;
  isLoading: boolean;
  error: boolean;
}

export const initialState: ConfigState = {
  data: null,
  auth: null,
  activeOrganizationId: null,
  activeOrganizationExternalId: null,
  isOrganizationTokenLoading: false,
  isLoading: false,
  error: false,
};

export default handleActions(
  {
    [ConfigActions.RestoreStateFromLocal](state: any, { payload }) {
      return {
        ...state,
        auth: payload,
        isLoading: true,
        error: false,
      };
    },

    // --------------- PENDING --------------------------
    [(ConfigActions.GetConfig, ConfigActions.GetFromOneTimeToken)](state: any) {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    },

    [ConfigActions.GetActiveOrganiztionAccessToken](state: any, { payload }: any) {
      return {
        ...state,
        isLoading: true,
        isOrganizationTokenLoading: true,
        activeOrganizationId: null,
        activeOrganizationExternalId: payload.legalEntityExternalId,
        error: false,
      };
    },

    // --------------- ERROR --------------------------
    [(ConfigActions.GetConfigError,
    ConfigActions.GetFromOneTimeTokenError,
    ConfigActions.GetActiveOrganiztionAccessTokenError)](state: ConfigState) {
      return {
        ...state,
        error: true,
        isLoading: false,
        isOrganizationTokenLoading: false,
      };
    },

    // --------------- SUCCESS --------------------------
    [ConfigActions.GetConfigSuccess](state: ConfigState, { payload: { data } }: any) {
      return {
        ...state,
        error: false,
        isLoading: false,
        data: data.item,
      };
    },

    [ConfigActions.GetFromOneTimeTokenSuccess](state: ConfigState, { payload: { data } }: any) {
      return {
        ...state,
        error: false,
        isLoading: false,
        auth: data,
      };
    },

    [ConfigActions.GetActiveOrganiztionAccessTokenSuccess](state: ConfigState, { payload: { data } }: any) {
      return {
        ...state,
        error: false,
        isLoading: false,
        auth: data,
        isOrganizationTokenLoading: false,
        activeOrganizationId: data.legalEntityId,
      };
    },
  },
  initialState,
);
