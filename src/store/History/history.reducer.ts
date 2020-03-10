import { handleActions } from 'redux-actions';
import { HistoryActions } from './history.actions';

export interface History {
  /**
   * Все операции
   *
   * @type {Payment[]}
   * @memberof History
   */
  items: Payment[];
  /** Общее число записей */
  total: number;
}

export interface Payment {
  /** ID записи */
  id: number;
  /** ID пользователя */
  accountId: number;
  /** Тип записи */
  type: string;
  /** Сумма */
  sum: number;
  /** DISPLYAED Дата записи */
  date: number;
  /** Назначение платежа */
  purpose: string;
  /** Номер зоны */
  zoneNumber?: string | null;
  /** Рег. номер автомобиля */
  vrp?: string | null;
  /** Местный/инстранный номер */
  vrpFormat?: string | null;
  /** Тип ТС - авто/грузовик/автобус */
  vehicleType?: string | null;
  /** - */
  serviceId?: string | null;
  /** - */
  sourceId?: any | null;
  /** ID бронирования */
  reservationId?: number | null;
  /** Timestamp начала бронирования */
  reservationStart?: number | null;
  /** Timestamp окончания бронирования */
  reservationEnd?: number | null;
  /** - */
  renewId?: any | null;
  /** Отмена */
  cancelled?: boolean | null;
  /** - */
  sourceValue?: any | null;
  /** - */
  gatedParkingNumber?: any | null;
  /** - */
  gatedParkingSessionStart?: any | null;
  /** - */
  gatedParkingSessionDepartureDate?: any | null;
  /** - */
  benefits: any[];
  /** - */
  accountTransfer?: any | null;
  /** - */
  refundedPaymentDate?: any | null;
  /** Назначение платежа */
  purposeTitle: PurposeTitle;
}

interface PurposeTitle {
  ru: string;
  en: string;
}

export interface HistoryState {
  data: History;
  isLoading: boolean;
  error: boolean;
}

export const initialState: HistoryState = {
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
    [(HistoryActions.GetHistory, HistoryActions.DownloadHistory)](state: HistoryState) {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    },

    // --------------- ERROR --------------------------
    [(HistoryActions.GetHistoryError, HistoryActions.DownloadHistoryError)](state: HistoryState) {
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    },

    // --------------- SUCCESS --------------------------
    [HistoryActions.GetHistorySuccess](state: HistoryState, { payload: { data } }: any) {
      return {
        ...state,
        error: false,
        isLoading: false,
        data: data,
      };
    },
    [(HistoryActions.GetHistorySuccess, HistoryActions.DownloadHistory)](state: HistoryState) {
      return {
        ...state,
        error: false,
        isLoading: false,
      };
    },
  },
  initialState,
);
