import React from 'react';
import { DatePicker } from 'antd';
import styles from './FormReconciliation.module.scss';
import FormRowItem from '../../../../shared/components/FormRowItem';
import Button from '../../../../shared/components/AntOverrides/Button';
import { PDF } from '../../../../shared/Icons/NavSvg';

const FormReconciliation = () => {
  return (
    <form>
      <FormRowItem label="С даты">
        <DatePicker placeholder="Выберите дату" className={styles.DatePiker} />
      </FormRowItem>
      <FormRowItem label="По дату">
        <DatePicker placeholder="Выберите дату" className={styles.DatePiker} />
      </FormRowItem>
      <Button type="primary" className={styles.Button}>
        <PDF size={16} fill="white" opacity={1} />
        <span>Выгрузить акт сверки</span>
      </Button>
    </form>
  );
};

export default FormReconciliation;
