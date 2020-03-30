import React from 'react';
import styles from './DataTable.module.scss';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Store } from '../../../../store';
import { Table } from 'antd';
import { Item } from '../../../../store/LimitSets/limitSets.reducer';
import Tag from '../../../../shared/components/AntOverrides/Tag';
import MoreMenu from './components/MoreMenu';

const columns: any[] = [
  {
    title: 'Название',
    render: ({ title }: { title: string }) => <div>{title}</div>,
  },
  {
    title: 'Ограничения',
    render: ({
      zoneNumbers,
      schedule,
      moneyLimits,
      vehiclesLimited,
    }: {
      zoneNumbers: number[];
      schedule: any;
      moneyLimits: any;
      vehiclesLimited: any;
    }) => (
      <div>
        {zoneNumbers?.length ? (
          <Tag>
            зоны <span className={styles.SpanTag}>{zoneNumbers.length}</span>
          </Tag>
        ) : null}
        {schedule ? <Tag>время</Tag> : null}
        {moneyLimits ? <Tag>сумма</Tag> : null}
        {vehiclesLimited ? <Tag>транспорт</Tag> : null}
      </div>
    ),
  },
  {
    title: 'Водители',
    width: 100,
    render: ({ countDrivers }: { countDrivers: number }) => <span className={styles.SpanDrivers}>{countDrivers}</span>,
  },
  {
    title: '',
    width: 20,
    render: (record: any) => <MoreMenu vehicle={record} />,
  },
];

const DataTable = () => {
  const list: Item[] = useSelector((state: Store) => state.limitSets.data.items);

  // получение организации

  // const items = useSelector((state: Store) => state.legalEntities.items)
  // const { id } = useParams();
  // const organization = items.find(({externalId}) => externalId === +(id || -1));

  return (
    <div className={cn(styles.DataTable)}>
      {list && (
        <Table
          pagination={{
            pageSize: 5,
          }}
          columns={columns}
          dataSource={list}
        />
      )}
    </div>
  );
};

export default DataTable;
