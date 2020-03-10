import { handleActions } from 'redux-actions';
import { OrgProfileActions } from './OrgProfile.actions';

export interface Address {
  actualAddress: string;
  legalAddress: string;
}

export interface Contact {
  email: string;
  phone: string;
}

export interface PaymentDetail {
  account: string;
  korAccount: string;
  bankName: string;
  bic: string;
}

export interface Chief {
  firstName: string;
  middleName: string;
  lastName: string;
  post: string;
}

export interface LegalEntityInfo {
  shortName: string;
  fullName: string;
  type: string;
  organizationType: string;
  inn: string;
  kpp: string;
  ogrnip: string;
  notes: string;
  addresses: Address;
  contacts: Contact;
  paymentDetails: PaymentDetail;
  chief: Chief;
}

export interface PaymentsInfo {
  totalPaymentsSum: number;
}

export interface OfferInfo {
  accepted: boolean;
  acceptorId: string;
  acceptanceDate: string;
}

export interface Exported {
  legalEntitiesAccounting: boolean;
}

export interface OrgItem {
  _id?: string;
  externalId?: number;
  accountId?: number;
  status?: string;
  partial?: boolean;
  defaultLimitProfileId?: string;
  legalEntityInfo?: LegalEntityInfo;
  paymentsInfo?: PaymentsInfo;
  offerInfo?: OfferInfo;
  exported?: Exported;
  createDate?: string;
  updateDate?: string;
  balance?: number;
}

export interface OrgProfileState {
  data: OrgItem | null;
  isLoading: boolean;
  error: boolean;
}

export const initialState: OrgProfileState = {
  data: null,
  isLoading: false,
  error: false,
};

export default handleActions(
  {
    // --------------- PENDING --------------------------
    [OrgProfileActions.GetOrgProfile](state: any) {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    },

    // --------------- ERROR --------------------------
    [OrgProfileActions.GetOrgProfileError](state: any) {
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    },

    // --------------- SUCCESS --------------------------
    [OrgProfileActions.GetOrgProfileSuccess](state: any, { payload: { data } }: any) {
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
