import React, { FC, useState } from 'react';
import styles from './DataTable.module.scss';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import Columns from './components/Columns';
import ModalStopReservation from './components/ModalStopReservation';
import { Store } from '../../../../store';

const DataTable: FC = () => {
  const [stopReservationId, setStopReservationId] = useState(undefined);

  const parkings = useSelector((state: Store) => state.parkings.data.items);
  const { isLoading } = useSelector((state: Store) => state.parkings);

  const handleStopReservation = (_id?: any) => {
    setStopReservationId(_id);
  };

  return (
    <div className={styles.DataTable}>
      <Title level={3}>Текущие парковки</Title>
      {!parkings?.length && <Text disabled>Появятся здесь, когда будут</Text>}

      {!!parkings?.length && (
        <Table
          loading={isLoading}
          pagination={{
            pageSize: 5,
          }}
          columns={Columns({ handleStopReservation })}
          dataSource={parkings?.map(item => ({ ...item, key: item._id }))}
        />
      )}

      <ModalStopReservation onClose={handleStopReservation} reservationId={stopReservationId} />
    </div>
  );
};

export default DataTable;
