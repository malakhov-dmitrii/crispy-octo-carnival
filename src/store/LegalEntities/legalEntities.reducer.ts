import { combineActions, handleActions } from 'redux-actions';
import { LegalEntitiesActions } from './legalEntities.actions';

export interface ValidityInfo {
  missedFields: any[];
  valid: boolean;
}

export interface Addresse {
  legalAddress: string;
  actualAddress: string;
}

export interface Contact {
  phone: string;
  email: string;
}

export interface LegalEntityInfo {
  shortName: string;
  fullName: string;
  inn: string;
  type: string;
  ogrnip: string;
  addresses: Addresse;
  contacts: Contact;
}

export interface LegalEntityItem {
  externalId: number;
  employeeRoles: string[];
  validityInfo: ValidityInfo;
  legalEntityInfo: LegalEntityInfo;
  status: string;
  defaultLimitSetId: string;
}

export interface LegalEntitiesState {
  items: LegalEntityItem[];
  isLoading: boolean;
  error: boolean;
}

export const initialState: LegalEntitiesState = {
  items: [],
  isLoading: false,
  error: false,
};

const pendingActions: any = combineActions(
  LegalEntitiesActions.GetLegalEntities,
  LegalEntitiesActions.CreateChiefRequest,
  LegalEntitiesActions.UpdateLegalEntities,
);

const errorActions: any = combineActions(
  LegalEntitiesActions.GetLegalEntitiesError,
  LegalEntitiesActions.CreateChiefRequestError,
  LegalEntitiesActions.UpdateLegalEntitiesError,
);

const successActions: any = combineActions(LegalEntitiesActions.UpdateLegalEntitiesSuccess);

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
    [successActions](state: any) {
      return {
        ...state,
        error: false,
        isLoading: false,
      };
    },
    [LegalEntitiesActions.GetLegalEntitiesSuccess](state: any, { payload: { data } }: any) {
      return {
        ...state,
        error: false,
        isLoading: false,
        items: data,
      };
    },
    [LegalEntitiesActions.CreateChiefRequestSuccess](state: any, { payload: { data } }: any) {
      return {
        ...state,
        error: false,
        isLoading: false,
        items: state.items.map((item: LegalEntityItem) => (item.externalId === data?.externalId ? data : item)),
      };
    },
  },
  initialState,
);
