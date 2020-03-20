import React, { FC } from 'react';
import { Button, Typography } from 'antd';
import styles from './EvacuationWindow.module.scss';
import Modal from '../../../../shared/components/AntOverrides/Modal';
import { Bus, Car, Truck } from '../../../../shared/Icons/NavSvg';

const { Text } = Typography;

const icons: any = {
  car: Car,
  bus: Bus,
  truck: Truck,
};

interface EvacuationWindow {
  onClose: () => void;
  item: any;
}

const CheckWindow: FC<EvacuationWindow> = ({ item, onClose }) => {
  const Icon = icons[item.icon || 'car'];

  const modalOptions = {
    visible: !!item,
    title: 'Эвакуация',
    width: '800px',
    footer: (
      <Button type="primary" onClick={onClose}>
        Закрыть
      </Button>
    ),
  };

  return (
    <Modal {...modalOptions} onCancel={onClose}>
      <div className={styles.WindowBody}>
        <div className={styles.FlexCenter}>
          <Icon size={30} />
          <Text className={styles.NumberCar}>{item.numberCar}</Text>
        </div>
        <p>Автомобиль эвакуирован на спецстоянку</p>
        <Text className={styles.Label}>Дата эвакуации</Text>
        <p>08.02.2018 в 10:55</p>
        <Text className={styles.Label}>Адрес эвакуации</Text>
        <p>Тихорецкий бульвар, д. 1</p>
        <Text className={styles.Label}>Подразделение ГИБДД / МАДИ</Text>
        <p>МАДИ - 4 МТУ</p>
        <p>Южнопортовая ул., вл. 37а (ежедневно, круглосуточно), Старая Басманная ул., д. 20, корп. 1</p>
        <p>8 (495) 540-76-56</p>
        <Text className={styles.Label}>Адрес специализированной стоянки</Text>
        <p>Южнопортовая ул., вл. 37а</p>
        <div className={styles.PriceBlock}>
          <div className={styles.PriceRow}>
            <Text className={styles.Label}>Перемещение</Text>
            <div className={styles.FlexCenter}>
              <Text className={styles.InitialPrice}>2000,00 ₽</Text>
              <Text>2000,00 ₽</Text>
            </div>
          </div>
          <div className={styles.PriceRow}>
            <Text className={styles.Label}>Хранение 2 дня</Text>
            <div className={styles.FlexCenter}>
              <Text className={styles.InitialPrice}>2000,00 ₽</Text>
              <Text>2000,00 ₽</Text>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CheckWindow;
