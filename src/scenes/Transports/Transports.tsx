import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Modal } from 'antd';
import Title from 'antd/lib/typography/Title';

import styles from './Transports.module.scss';
import DataTable from './components/DataTable';
import ModalBody from './components/ModalBody';

import { TransportsActions } from '../../store/Transport/transports.actions';

import Button from '../../shared/components/AntOverrides/Button';
import ButtonPlus from '../../shared/Icons/ButtonPlus';

const Transport = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [isVehicle, setVehicle] = useState({ vehicleType: 'car' });
  const [isOptionsModal, setOptionsModal] = useState({ title: '', okText: '' });

  useEffect(() => {
    dispatch({ type: TransportsActions.GetTransports });
  }, [dispatch]);

  return (
    <>
      <Row type="flex" justify="start" align="middle">
        <Col className={styles.FlexGrowOne}>
          <Title>Транспорт</Title>
        </Col>
        <Col>
          <Button
            type="primary"
            className={styles.Button}
            onClick={() => {
              setOptionsModal({
                title: 'Добавить транспорт',
                okText: 'Добавить',
              });
              setVehicle({ vehicleType: 'car' });
              setIsModalVisible(true);
            }}
          >
            <ButtonPlus size={16} fill="white" opacity={1} className={styles.ButtonIcon} />
            <span>Добавить транспорт</span>
          </Button>
        </Col>
      </Row>
      <span>Какой-то уточняющий текст о ТС</span>
      <DataTable setOptionsModal={setOptionsModal} setIsModalVisible={setIsModalVisible} setVehicle={setVehicle} />
      <Modal
        title={isOptionsModal.title}
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        okText={isOptionsModal.okText}
        width={'384px'}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { width: '100%', margin: 0 } }}
        bodyStyle={{ paddingTop: '12px', paddingBottom: '12px' }}
      >
        <ModalBody isVehicle={isVehicle} setVehicle={setVehicle} />
      </Modal>
    </>
  );
};

export default Transport;
