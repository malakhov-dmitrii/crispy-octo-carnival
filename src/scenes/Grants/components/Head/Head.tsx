import React from 'react';
import styles from './Head.module.scss';
import { Row, Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import Button from '../../../../shared/components/AntOverrides/Button';
import ButtonPlus from '../../../../shared/Icons/ButtonPlus';

const Head = ({ setIsModalVisible }: any) => {
  return (
    <Row type="flex" justify="start" align="middle" className={styles.Head}>
      <Col className={styles.FlexGrowOne}>
        <Title>Абонементы</Title>
      </Col>
      <Col>
        <Button type="primary" className={styles.Button} onClick={() => setIsModalVisible(true)}>
          <ButtonPlus size={16} fill="white" opacity={1} className={styles.ButtonIcon} />
          <span>Добавить абонементы</span>
        </Button>
      </Col>
    </Row>
  );
};

export default Head;
