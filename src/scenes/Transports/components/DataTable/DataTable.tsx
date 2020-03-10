import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import Text from 'antd/lib/typography/Text';

import { Store } from '../../../../store';
import styles from './DataTable.module.scss';
import MoreMenu from '../MoreMenu';

interface DataTable {
  setOptionsModal: { (obj: any): void };
  setIsModalVisible: { (obj: any): void };
  setVehicle: { (obj: any): void };
}

const DataTable = ({ setOptionsModal, setIsModalVisible, setVehicle }: DataTable) => {
  const { data } = useSelector((state: Store) => state.transports);
  const columns = [
    {
      title: 'Номер ТС',
      dataIndex: 'vrp',
      key: 'vrp',
    },
    {
      title: 'Серия и номер СТС',
      dataIndex: 'sts',
      key: 'sts',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'zoneNdescriptionumber',
    },
    {
      title: '',
      render: (record: any) => (
        <MoreMenu
          vehicle={record}
          setOptionsModal={setOptionsModal}
          setIsModalVisible={setIsModalVisible}
          setVehicle={setVehicle}
        />
      ),
    },
  ];

  return (
    <div className={styles.DataTable}>
      {!data && <Text disabled>Появятся здесь, когда будут</Text>}

      {data && (
        <Table
          pagination={{
            pageSize: 5,
          }}
          columns={columns}
          dataSource={data?.map(item => ({ ...item, key: item.id }))}
        />
      )}
    </div>
  );
};

export default DataTable;
