import React, { FC } from 'react';
import { Button } from 'antd';

import styles from './Body.module.scss';
import { Grant } from '../../AddModal';
import Block from './components/Block';
import ButtonPlus from '../../../../../../shared/Icons/ButtonPlus';

interface Body {
  selectedAbonements: Grant[];
  setAbonements: { (props: any): void };
  createRecord: any;
  isError: boolean;
}

const Body: FC<Body> = ({ selectedAbonements, setAbonements, createRecord, isError }) => {
  return (
    <div className={styles.Body}>
      {selectedAbonements.map((abonement: Grant, index) => (
        <Block key={abonement.id} {...{ abonement, selectedAbonements, setAbonements, index, isError }} />
      ))}
      <Button
        type="dashed"
        className={styles.Button}
        onClick={() => setAbonements([...selectedAbonements, createRecord()])}
      >
        <ButtonPlus size={16} opacity={1} className={styles.ButtonPlus} />
        Добавить абонемент
      </Button>
    </div>
  );
};

export default Body;
