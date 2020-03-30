import React from 'react';
import styles from './ModalCreator.module.scss';
import cn from 'classnames';
import { Modal, Input } from 'antd';
import Button from '../../../../../../shared/components/AntOverrides/Button';
import FormRowItem from '../../../../../../shared/components/FormRowItem';

interface ModalCreator {
  isLimitSets: boolean;
  setLimitSets(arg: boolean): void;
}

const ModalCreator = ({ isLimitSets, setLimitSets }: ModalCreator) => {
  const footer = (
    <div className={cn(styles.Footer)}>
      <Button type="primary" className={cn(styles.Button)} onClick={() => setLimitSets(false)}>
        Сохранить
      </Button>
    </div>
  );

  return (
    <Modal
      width={384}
      className={cn(styles.ModalCreator)}
      title="Добавить набор ограничений"
      visible={isLimitSets}
      onCancel={() => setLimitSets(false)}
      footer={footer}
    >
      <FormRowItem label="Название">
        <Input placeholder="" />
      </FormRowItem>
    </Modal>
  );
};

export default ModalCreator;
