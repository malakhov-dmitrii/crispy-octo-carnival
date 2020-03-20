import React, { FC } from 'react';
import { Typography } from 'antd';
import styles from './ViolationsCard.module.scss';
import Info from '../../../../shared/Icons/Info';
import { Car, Bus, Truck } from '../../../../shared/Icons/NavSvg';
import Button from '../../../../shared/components/AntOverrides/Button';
import { format } from 'date-fns';

const { Text } = Typography;

const icons: any = {
  car: Car,
  bus: Bus,
  truck: Truck,
};

interface ViolationsCardProps {
  onInfoClick?: () => any;
  icon: string;
  numberCar: string;
  text: string;
  paid: boolean;
  paidDate?: string;
  initialPrice?: number;
  price: number;
}

const ViolationsCard: FC<ViolationsCardProps> = props => {
  const { onInfoClick, icon, numberCar, text, paid, paidDate, initialPrice, price } = props;
  const Icon = icons[icon || 'car'];

  return (
    <div className={styles.Card}>
      <div className={styles.CardHeader}>
        <div className={styles.CardTitle}>
          <Icon size={30} />
          <Text className={styles.NumberCar}>{numberCar}</Text>
        </div>
        {!!onInfoClick && (
          <Button className={styles.InfoButton} onClick={onInfoClick}>
            <Info size={18} />
          </Button>
        )}
      </div>
      <div className={styles.CardBody}>
        <Text className={paid ? styles.InactiveText : ''}>{text}</Text>
      </div>
      <div className={styles.CardFooter}>
        <div className={styles.PriceBlock}>
          {!!initialPrice && <Text className={styles.InitialPrice}>{`${(initialPrice / 100).toFixed(2)} ₽`}</Text>}
          <Text className={paid ? styles.InactiveText : ''}>{`${(price / 100).toFixed(2)} ₽`}</Text>
        </div>
        {!!paidDate && (
          <Text className={styles.Paid}>{`Оплачено ${format(new Date(paidDate).valueOf(), 'MM.dd.yyyy')}`}</Text>
        )}
      </div>
    </div>
  );
};

export default ViolationsCard;
