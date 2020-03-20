import React, { FC, useState } from 'react';
import { Row, Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import ViolationsCard from '../ViolationsCard';
import EvacuationWindow from '../EvacuationWindow';
import styles from './ListViolationsCard.module.scss';
import Button from '../../../../shared/components/AntOverrides/Button';

interface ListViolationsCardProps {
  items: any;
  type: 'evacuation' | 'penalty';
}

const listTitles: any = {
  evacuation: 'Эвакуации',
  penalty: 'Штрафы',
};

const ListViolationsCard: FC<ListViolationsCardProps> = ({ items, type }) => {
  const [showPaid, setShowPaid] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <div className={styles.ListHeader}>
        <Title level={3} className={styles.ListTitle}>
          {listTitles[type]}
        </Title>
        <Button onClick={() => setShowPaid(!showPaid)}>{`${showPaid ? 'Скрыть' : 'Показать'} оплаченные`}</Button>
      </div>
      <Row gutter={[16, 16]}>
        {!!items.length &&
          items.map(
            (item: any) =>
              ((item.paid && showPaid) || !item.paid) && (
                <Col key={item.id} className={styles.FlexGrowOne} sm={8} xs={24}>
                  <ViolationsCard
                    {...(type === 'evacuation' && { onInfoClick: () => setSelectedItem(item) })}
                    {...item}
                  />
                </Col>
              ),
          )}
      </Row>
      {type === 'evacuation' && selectedItem && (
        <EvacuationWindow onClose={() => setSelectedItem(null)} item={selectedItem} />
      )}
    </>
  );
};

export default ListViolationsCard;
