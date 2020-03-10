import { handleActions, combineActions } from 'redux-actions';
import { ReceiptsActions } from './receipts.actions';

export interface Grant {
  abonementId: number;
  benefitId: number;
  sum: number;
  start: string;
  end: string;
  vrp: string;
  vrpFormat: string;
}

export interface Addresse {
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
  bIC: string;
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
  ogrn: string;
  notes: string;
  addresses: Addresse;
  contacts: Contact;
  paymentDetails: PaymentDetail;
  chief: Chief;
}

export interface MoneyOrder {
  sum: number;
  ids: string[];
}

export interface PayInfo {
  sum: number;
  status: string;
}

export interface Receipt {
  _id: number;
  accountId: number;
  type: string;
  sum: number;
  grants: Grant[];
  legalEntityId: string;
  legalEntityInfo: LegalEntityInfo;
  status: string;
  paymentIds: number[];
  moneyOrders: MoneyOrder;
  payInfo: PayInfo;
  createDate: string;
  updateDate: string;
}

export interface ReceiptsState {
  data: {
    items: Receipt[];
    total: number;
  };
  isLoading: boolean;
  error: boolean;
}

export const initialState: ReceiptsState = {
  data: {
    items: [],
    total: 0,
  },
  isLoading: false,
  error: false,
};

const pendingActions: any = combineActions(
  ReceiptsActions.GetReceipts,
  ReceiptsActions.CreateReceipts,
  ReceiptsActions.DownloadReceipts,
  ReceiptsActions.SendInvoiceReceipts,
);

const errorActions: any = combineActions(
  ReceiptsActions.GetReceiptsError,
  ReceiptsActions.CreateReceiptsError,
  ReceiptsActions.DownloadReceiptsError,
  ReceiptsActions.SendInvoiceReceiptsError,
);

const successActions: any = combineActions(
  ReceiptsActions.CreateReceiptsSuccess,
  ReceiptsActions.DownloadReceiptsSuccess,
  ReceiptsActions.SendInvoiceReceiptsSuccess,
);

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
    [ReceiptsActions.GetReceiptsSuccess](state: any, { payload }: any) {
      return {
        ...state,
        error: false,
        isLoading: false,
        ...payload,
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
