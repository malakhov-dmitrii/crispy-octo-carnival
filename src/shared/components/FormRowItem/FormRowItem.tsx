import React, { FC, ReactElement } from 'react';
import styles from './FormRowItem.module.scss';
import Text from 'antd/lib/typography/Text';
import { isNumber } from 'util';

interface FormRowItemProps {
  label: string | ReactElement;
  marginBottom?: number;
  error?: string;
}

const FormRowItem: FC<FormRowItemProps> = ({ label, marginBottom, children, error }) => {
  return (
    <div
      className={styles.FormRowItem}
      style={{
        marginBottom: (isNumber(marginBottom) ? marginBottom : 16) + 'px',
      }}
    >
      <Text className={styles.FormRowItemText}>{label}</Text>
      {children}
      {!!error && <Text type="danger">{error}</Text>}
    </div>
  );
};

export default FormRowItem;
