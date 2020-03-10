import { useEffect } from 'react';
import { notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from '../../../store';
import { OpenNotification } from '../../../store/Notification/notification.reducer';
import { NotificationActions } from '../../../store/Notification/notification.actions';

const openNotification = (props: OpenNotification) => {
  const rerquest: any = {
    placement: props.placement,
    message: props.message,
  };

  props.description && (rerquest.description = props.description);
  switch (props.type) {
    case 'error':
      notification.error(rerquest);
      break;
    case 'success':
      notification.success(rerquest);
      break;
    case 'warning':
      notification.warning(rerquest);
      break;
    default:
      notification.close(rerquest);
  }
};

const Notification = () => {
  const { list } = useSelector((state: Store) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (list?.length) {
      openNotification({
        placement: 'bottomRight',
        ...list[0],
      });
      dispatch({
        type: NotificationActions.ShiftNotification,
      });
    }
  }, [list, dispatch]);

  return null;
};

export default Notification;
