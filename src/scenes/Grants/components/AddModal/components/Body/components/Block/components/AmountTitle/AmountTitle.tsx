import React, { FC } from 'react';
import NumberFormat from 'react-number-format';
import Title from 'antd/lib/typography/Title';
import { useSelector } from 'react-redux';

import { Grant } from '../../../../../../AddModal';
import { Store } from '../../../../../../../../../../store';

interface AmountTitle {
  abonement: Grant;
}

const AmountTitle: FC<AmountTitle> = ({ abonement }) => {
  const abonements = useSelector((state: Store) => state.abonements.data.items);

  return (
    <Title level={3}>
      <NumberFormat
        value={(abonements.find(({ _id }) => _id === abonement.abonementId)?.price || 0) / 100}
        displayType={'text'}
        thousandSeparator={' '}
        suffix={' ₽'}
      />
    </Title>
  );
};

export default AmountTitle;
