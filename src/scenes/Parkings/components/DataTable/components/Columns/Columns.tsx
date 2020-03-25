import React from 'react';
import { ParkingReservation } from '../../../../../../store/Parkings/parkings.reducer';
import { format } from 'date-fns';
import Button from '../../../../../../shared/components/AntOverrides/Button';
import { timeFormat } from '../../../../../../shared/utils';
import styles from './Columns.module.scss';

export default ({ handleStopReservation }: any) => [
  {
    title: 'Зона',
    dataIndex: 'zoneNumber',
    key: 'zoneNumber',
  },
  {
    title: 'Транспорт',
    dataIndex: 'vrp',
    key: 'vrp',
  },
  {
    title: 'Начало',
    render: (completed: boolean, record: ParkingReservation) => {
      return <span key={record.start}>{format(new Date(record.start), 'MM.dd.yyyy HH:mm')}</span>;
    },
  },
  {
    title: 'Конец',
    render: (completed: boolean, record: ParkingReservation) => {
      return <span key={record.end}>{format(new Date(record.end), 'MM.dd.yyyy HH:mm')}</span>;
    },
  },
  {
    title: 'Осталось',
    render: (completed: boolean, record: ParkingReservation) => {
      // !TODO: Другой формат времени.
      return <span key={record.remainingTime}>{timeFormat(record.remainingTime)}</span>;
    },
  },
  {
    title: '',
    key: 'id',
    render: (text: string, record: ParkingReservation) => (
      <div className={styles.ButtonRow} key={record._id}>
        <Button className={styles.StopButton} onClick={() => handleStopReservation(record._id)}>
          Остановить
        </Button>
        <Button type="primary" className={styles.ProlongateButton}>
          Продлить
        </Button>
      </div>
    ),
  },
];
