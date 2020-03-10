import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';

import styles from './Footer.module.scss';
import { ReceiptsActions } from '../../../../../../store/Receipts/receipts.actions';
import { Grant } from '../../AddModal';
import { Store } from '../../../../../../store';
import Button from '../../../../../../shared/components/AntOverrides/Button';
import NumberFormat from 'react-number-format';

interface Footer {
  selectedAbonements: Grant[];
  setIsModalVisible: { (props: any): void };
  setError: { (props: any): void };
}

const Footer: FC<Footer> = ({ setIsModalVisible, selectedAbonements, setError }) => {
  const abonements = useSelector((state: Store) => state.abonements.data.items);
  const dispatch = useDispatch();

  const Cost = () => {
    // Считаем общуюю сумму выбранных обанементов
    const sum = selectedAbonements.reduce((accumulator, item) => {
      return accumulator + (abonements.find(({ _id }) => _id === item.abonementId)?.price || 0);
    }, 0);

    if (sum) {
      return (
        <>
          {`Итого ${selectedAbonements.filter(item => item?.abonementId).length} абонемент на сумму `}
          <NumberFormat value={sum / 100} displayType={'text'} thousandSeparator={' '} suffix={' ₽'} />
        </>
      );
    } else {
      return <>Укажите параметры абонементов, чтобы узнать стоимость</>;
    }
  };

  // Создаем счет и закрываем модальное окно
  const createReceipts = () => {
    const grants = [];

    // Если обязаетльное поле не заполнено, задаем статус ошибки в <True>
    for (const item of selectedAbonements) {
      if (!item.abonementId || !item.vrp || !item.start || !item.vrpFormat) return setError(true);
      grants.push({ abonementId: item.abonementId, vrp: item.vrp, start: item.start, vrpFormat: item.vrpFormat });
    }

    dispatch({ type: ReceiptsActions.CreateReceipts, payload: { grants, type: 'abonements' } });

    setIsModalVisible(false);
  };

  return (
    <Row type="flex" justify="start" className={styles.Footer}>
      <Col className={styles.FlexGrowOne}>
        <Cost />
      </Col>
      <Col>
        <Button type="primary" onClick={createReceipts}>
          <span>Сформировать счет</span>
        </Button>
        <Button onClick={() => setIsModalVisible(false)}>
          <span>Отмена</span>
        </Button>
      </Col>
    </Row>
  );
};

export default Footer;
