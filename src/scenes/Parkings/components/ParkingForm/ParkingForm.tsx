import React, { FC, useState } from 'react';
import Title from 'antd/lib/typography/Title';
import styles from './ParkingForm.module.scss';
import { Radio } from 'antd';
import ContentCard from '../../../../shared/components/ContentCard';
import StreetParkingForm from './components/StreetParkingForm';
import WithBarrierParkingForm from './components/WithBarrierParkingForm';

const ParkingForm: FC = () => {
  const [form, setForm] = useState('street');
  return (
    <ContentCard>
      <Title level={3}>Оплатить</Title>
      <Radio.Group value={form} className={styles.ButtonBlock}>
        <Radio.Button value="street" onClick={() => setForm('street')}>
          Уличная парковка
        </Radio.Button>
        <Radio.Button value="withBarrier" onClick={() => setForm('withBarrier')}>
          Парковка со шлагбаумом
        </Radio.Button>
      </Radio.Group>
      <br />
      {form === 'street' && <StreetParkingForm />}
      {form === 'withBarrier' && <WithBarrierParkingForm />}
    </ContentCard>
  );
};

export default ParkingForm;
