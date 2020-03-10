import React, { FC } from 'react';
import styles from './DataTable.module.scss';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import { Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Columns from './components/Columns';
import { Store } from '../../../../store';

const DataTable: FC = () => {
  const dispatch = useDispatch();
  const parkings = useSelector((state: Store) => state.parkings.data.items);
  const { isLoading } = useSelector((state: Store) => state.parkings);

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
          columns={Columns({ dispatch })}
          dataSource={parkings?.map(item => ({ ...item, key: item._id }))}
        />
      )}
    </div>
  );
};

export default DataTable;
