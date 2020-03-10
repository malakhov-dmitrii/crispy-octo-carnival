import React from 'react';
import styles from './DataTable.module.scss';
import Text from 'antd/lib/typography/Text';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { Store } from '../../../../store';
import { format } from 'date-fns';
import { Grants } from '../../../../store/Grants/grants.reducer';
// import MoreMenu from '../MoreMenu';

const columns = [
  {
    title: 'Номер ТС',
    key: 'vrp',
    dataIndex: 'vrp',
  },
  {
    title: 'Абонемент',
    key: 'benefitName',
    dataIndex: 'benefitName',
  },
  {
    title: 'Срок действия',
    key: 'validity',
    render: (completed: boolean, record: Grants) => {
      return (
        <span key={record.end}>
          с {format(+record.start, 'MM.dd.yyyy H:m')} до {format(+record.end, 'MM.dd.yyyy H:m')}
        </span>
      );
    },
  },
  {
    title: '',
    // render: (record: any) => <MoreMenu grant={record} />,
  },
];

const DataTable = () => {
  const {
    data: { items },
  } = useSelector((state: Store) => state.grants);

  return (
    <div className={styles.DataTable}>
      {!items.length && <Text disabled>Список абонементов появятся здесь</Text>}

      {items.length > 0 && (
        <Table
          pagination={{
            pageSize: 5,
          }}
          columns={columns}
          dataSource={items?.map(item => ({ ...item, key: item._id }))}
        />
      )}
    </div>
  );
};

export default DataTable;
