import React, { FC, useState, useEffect } from 'react';
import styles from './AddModal.module.scss';
import { Modal } from 'antd';
import Footer from './components/Footer';
import Body from './components/Body';

interface AddModal {
  isModalVisible: boolean;
  setIsModalVisible: { (props: any): void };
}

export interface Grant {
  id: number;
  abonementId?: number;
  start?: string;
  vrp?: string;
  vrpFormat?: string;
}

// Иметируем уникальные Id для листа абонементов
let counter = 0;
const createRecord = (): { id: number; vrpFormat: string } => ({ id: counter++, vrpFormat: 'local' });

const AddModal: FC<AddModal> = ({ isModalVisible, setIsModalVisible }) => {
  const [selectedAbonements, setAbonements]: [any, { (props: any): void }] = useState();
  const [isError, setError] = useState();

  // При открытии модального окна обнуляем все данные
  useEffect(() => {
    if (isModalVisible) {
      setAbonements([createRecord()]);
      setError(false);
    }
  }, [isModalVisible]);

  const modalProps = {
    className: styles.AddModal,
    title: 'Оплата абонементов',
    width: '747px',
    okText: 'Сформировать счет',
    cancelText: 'Отмена',
    bodyStyle: { paddingTop: '12px', paddingBottom: '12px' },
    onCancel: () => setIsModalVisible(false),
    visible: isModalVisible,
    footer: <Footer {...{ setIsModalVisible, selectedAbonements, setError }} />,
  };

  return (
    <Modal {...modalProps}>
      <Body {...{ selectedAbonements, setAbonements, createRecord, isError }} />
    </Modal>
  );
};

export default AddModal;
