import React, { FC } from 'react';
import { Alert, Row, Col, Input, DatePicker } from 'antd';
import cn from 'classnames';

import styles from './Block.module.scss';
import { Grant } from '../../../../AddModal';
import Title from 'antd/lib/typography/Title';
import ButtonDelete from './components/ButtonDelete';
import SelectAbonements from './components/SelectAbonements';
import AmountTitle from './components/AmountTitle';

interface Block {
  selectedAbonements: Grant[];
  abonement: Grant;
  index: number;
  setAbonements: { (props: any): void };
  isError: boolean;
}

const Block: FC<Block> = ({ abonement, selectedAbonements, index, setAbonements, isError }) => {
  /**
   * Grant change function
   *
   * @param {number} index - Array index
   * @param {string} name - veriable parameter key
   * @param {any} valye - veriable parametr value
   */
  const handler = (index: number, name: string, value: any) => {
    const data = [...selectedAbonements];

    data[index] = {
      ...selectedAbonements[index],
      [name]: value,
    };
    setAbonements(data);
  };

  const message = (
    <>
      <Row type="flex" justify="start" className={styles.Row}>
        <Col className={styles.GrowRow}>
          <Title level={4}>Абонемент № {index + 1}</Title>
        </Col>
        <Col>
          <ButtonDelete {...{ index, setAbonements, selectedAbonements }} />
        </Col>
      </Row>
      <Row>
        <Col className={cn({ [styles.HasError]: isError && !abonement.abonementId })}>
          <SelectAbonements handler={handler} abonement={index} />
        </Col>
      </Row>
      <Row type="flex" justify="start" className={styles.Row}>
        <Col className={cn(styles.GrowRow)}>
          <Row type="flex" justify="start">
            <Col className={cn({ [styles.HasError]: isError && !abonement.vrp })}>
              <Input placeholder="Введите номер машины" onChange={e => handler(index, 'vrp', e.target.value)} />
            </Col>
            <Col className={cn({ [styles.HasError]: isError && !abonement.start })}>
              <DatePicker
                onChange={(moment, dateString) => handler(index, 'start', dateString)}
                placeholder="Выберите дату начала"
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <AmountTitle {...{ abonement }} />
        </Col>
      </Row>
    </>
  );

  return (
    <div className={styles.Block}>
      <Alert key={abonement.id} message={message} />
    </div>
  );
};

export default Block;
