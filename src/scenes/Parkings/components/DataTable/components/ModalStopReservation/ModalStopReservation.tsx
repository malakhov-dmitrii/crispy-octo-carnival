import React, { FC } from 'react';
import { Modal } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useDispatch } from 'react-redux';
import { ParkingsActions } from '../../../../../../store/Parkings/parkings.actions';

interface ModalStopReservationProps {
  onClose: () => void;
  reservationId?: number;
}

const ModalStopReservation: FC<ModalStopReservationProps> = ({ onClose, reservationId }) => {
  const dispatch = useDispatch();

  return (
    <Modal
      title="Остановить"
      visible={!!reservationId}
      onOk={() => {
        dispatch({
          type: ParkingsActions.StopParking,
          payload: { reservationId },
        });
        onClose();
      }}
      onCancel={() => onClose()}
      okText="Остановить"
      cancelText="Отмена"
    >
      <Text>Вы хотите прервать парковку?</Text>
    </Modal>
  );
};

export default ModalStopReservation;
