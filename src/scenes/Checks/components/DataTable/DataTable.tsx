import React from 'react';
import styles from './DataTable.module.scss';
import NumberFormat from 'react-number-format';
import Text from 'antd/lib/typography/Text';
import { Table } from 'antd';
import { format } from 'date-fns';
import MoreMenu from '../MoreMenu';
import { Store } from '../../../../store';
import { useSelector } from 'react-redux';
import { Receipt } from '../../../../store/Receipts/receipts.reducer';

const listStatusPayInfo = [
  {
    id: 'paid',
    name: 'Оплачен',
  },
  {
    id: 'unpaid',
    name: 'Не оплачен',
  },
  {
    id: 'overpaid',
    name: 'Переплаченный',
  },
  {
    id: 'partiallyPaid',
    name: 'Частично оплачиваемый',
  },
];

const columns = [
  {
    title: 'Сформирован',
    key: 'date',
    render: (completed: boolean, record: Receipt) => (
      <span key={record.createDate}>{format(new Date(record.createDate).valueOf(), 'MM.dd.yyyy H:m')}</span>
    ),
  },
  {
    title: 'Номер',
    key: 'number',
    dataIndex: '_id',
  },
  {
    title: 'Сумма',
    key: 'amount',
    render: (completed: boolean, record: Receipt) => (
      <NumberFormat
        value={record?.sum.toFixed(2)}
        displayType={'text'}
        thousandSeparator={' '}
        decimalScale={2}
        suffix={' ₽'}
      />
    ),
  },
  {
    title: 'Статус',
    key: 'status',
    render: (completed: boolean, record: Receipt) =>
      (
        listStatusPayInfo.find(({ id }) => record.payInfo.status === id) || {
          name: 'Не известно',
        }
      ).name,
  },
  {
    title: '',
    render: (record: any) => <MoreMenu {...record} />,
  },
];

const DataTable = () => {
  const receipts = useSelector((state: Store) => state.receipts.data.items);

  return (
    <div className={styles.DataTable}>
      {receipts.length === 0 && <Text disabled>Появятся здесь, когда будут</Text>}

      {receipts.length > 0 && (
        <Table
          pagination={{
            pageSize: 8,
          }}
          columns={columns}
          dataSource={receipts}
        />
      )}
    </div>
  );
};

export default DataTable;
