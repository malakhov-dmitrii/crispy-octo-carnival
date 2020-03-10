import React from 'react';
import styles from './HistoryForm.module.scss';
import { Input, Select, DatePicker } from 'antd';
import { RangePickerValue } from 'antd/lib/date-picker/interface';

import FormRowItem from '../../../../shared/components/FormRowItem';
import { throttle } from 'lodash';

const { RangePicker } = DatePicker;
const { Option } = Select;

const operationsTypes = [
  {
    value: '',
    title: 'Все',
  },
  {
    value: 'writeoff',
    title: 'Оплата',
  },
  {
    value: 'refill',
    title: 'Пополнение',
  },
  {
    value: 'return',
    title: 'Возврат',
  },
];

const HistoryForm = ({ filter, handleFilter, zonesList }: any) => {
  const selectOperationType = (
    <Select
      value={filter.type}
      style={{ width: 250 }}
      onChange={(value: string) => handleFilter({ type: value })}
      placeholder={'Все'}
    >
      {operationsTypes.map(option => (
        <Option key={option.value} value={option.value}>
          {option.title}
        </Option>
      ))}
    </Select>
  );

  const selectZone = zonesList && (
    <Select
      value={filter.zoneNumber}
      style={{ width: 165 }}
      onChange={(value: string) => handleFilter({ zoneNumber: value })}
    >
      <Option value="">Все</Option>
      {zonesList.map((option: any) => (
        <Option key={option._id} value={option.number}>
          {option.number}
        </Option>
      ))}
    </Select>
  );
  return (
    <div className={styles.HistoryForm}>
      <FormRowItem label="Период">
        <RangePicker
          value={[filter.start, filter.end]}
          onChange={(moments: RangePickerValue) => {
            handleFilter({ start: moments[0], end: moments[1] });
          }}
          style={{ width: 160 }}
        />
      </FormRowItem>

      <FormRowItem label="Тип операции">{selectOperationType}</FormRowItem>

      <FormRowItem label="Зона">{selectZone}</FormRowItem>

      <FormRowItem label="Номер машины">
        <Input
          value={filter.vrp}
          onChange={throttle((e: any) => {
            handleFilter({ vrp: e.target.value });
          }, 500)}
          placeholder={'Введите номер машины'}
        />
      </FormRowItem>
    </div>
  );
};

export default HistoryForm;
