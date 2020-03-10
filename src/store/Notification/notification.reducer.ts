import { combineActions, handleActions } from 'redux-actions';
import { NotificationActions } from './notification.actions';

export interface OpenNotification {
  message: string;
  type: string;
  placement?: string;
  description?: string;
}

export interface OpenNotificationState {
  list: OpenNotification[];
}

export const initialState: OpenNotificationState = {
  list: [],
};

const pendingActions: any = combineActions(NotificationActions.PushNotification, NotificationActions.ShiftNotification);

const errorActions: any = combineActions(
  NotificationActions.PushNotificationEntitiesError,
  NotificationActions.ShiftNotificationEntitiesError,
);

export default handleActions(
  {
    // --------------- PENDING --------------------------
    [pendingActions](state: any) {
      return {
        ...state,
      };
    },

    // --------------- ERROR --------------------------
    [errorActions](state: any) {
      return {
        ...state,
      };
    },

    // --------------- SUCCESS --------------------------
    [NotificationActions.PushNotificationEntitiesSuccess](state: any, { payload }: any) {
      return {
        list: [...state.list, payload],
      };
    },
    [NotificationActions.ShiftNotificationEntitiesError](state: any) {
      if (state.list.length <= 1) return { list: [] };
      return {
        list: [...state.list.slice(1, state.list.length)],
      };
    },
  },
  initialState,
);
