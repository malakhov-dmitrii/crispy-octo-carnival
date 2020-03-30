import React, { useState } from 'react';
import styles from './Head.module.scss';
import { Row, Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import Button from '../../../../shared/components/AntOverrides/Button';
import ButtonPlus from '../../../../shared/Icons/ButtonPlus';
import ModalCreator from './components/ModalCreator';

const Head = () => {
  const [isLimitSets, setLimitSets] = useState(false);

  return (
    <div>
      <Row type="flex" justify="start" align="middle" className={styles.Head}>
        <ModalCreator {...{ isLimitSets, setLimitSets }} />
        <Col className={styles.FlexGrowOne}>
          <Title>Наборы ограничений</Title>
        </Col>
        <Col>
          <Button type="primary" className={styles.Button} onClick={() => setLimitSets(true)}>
            <ButtonPlus size={16} fill="white" opacity={1} className={styles.ButtonIcon} />
            <span>Добавить набор</span>
          </Button>
        </Col>
      </Row>
      <Row>
        <p>Какой-то уточняющий текст о ограничениях</p>
      </Row>
    </div>
  );
};

export default Head;
