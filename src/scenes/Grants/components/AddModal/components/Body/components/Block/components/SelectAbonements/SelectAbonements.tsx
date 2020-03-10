import React, { FC } from 'react';
import { Select } from 'antd';
import { useSelector } from 'react-redux';
import { Store } from '../../../../../../../../../../store';

const { Option } = Select;

interface SelectAbonements {
  abonement: number;
  handler: { (index: number, name: string, value: any): void };
}

const SelectAbonements: FC<SelectAbonements> = ({ abonement, handler }) => {
  const abonements = useSelector((state: Store) => state.abonements.data.items);

  return (
    <Select
      onChange={(index: number) => {
        handler(abonement, 'abonementId', abonements[index]._id);
      }}
      placeholder={'Выберите тип абонемента'}
    >
      {abonements.map(({ _id, name }, index) => (
        <Option key={_id} value={index}>
          {name}
        </Option>
      ))}
    </Select>
  );
};

export default SelectAbonements;
