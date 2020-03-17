import React from 'react';
import { Row } from 'antd';
import styles from './Reconciliation.module.scss';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import FormReconciliation from './components/FormReconciliation';

const Reconciliation = () => {
  return (
    <>
      <Row>
        <Title>Сверка расчетов</Title>
      </Row>
      <Row>
        <Text>Какой-то текст, разъясняющий акты сверки</Text>
      </Row>
      <div className={styles.Form}>
        <FormReconciliation />
      </div>
    </>
  );
};

export default Reconciliation;
