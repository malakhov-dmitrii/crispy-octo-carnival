import React, { useEffect, useState } from 'react';
import styles from './Balance.module.scss';
import Button from '../../../AntOverrides/Button';
import ButtonPlus from '../../../../Icons/ButtonPlus';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from '../../../../../store';
import { BalanceActions } from '../../../../../store/Balance/balance.actions';
import ModalBalance from './components/ModalBalance';

const Balance = () => {
  const { balance } = useSelector((state: Store) => state.balance);
  const { activeOrganizationId } = useSelector((state: Store) => state.config);
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (activeOrganizationId)
      dispatch({
        type: BalanceActions.GetBalance,
      });
  }, [dispatch, activeOrganizationId]);

  return (
    <div className={styles.Balance}>
      <p className={styles.BalanceTitle}>Баланс</p>
      <p className={styles.BalanceAmount}>
        {(balance / 100).toFixed(2)}
        <b className={styles.RubleSign}>₽</b>
      </p>
      <Button type="primary" className={styles.Button} onClick={() => setOpen(true)}>
        <ButtonPlus size={16} fill="white" opacity={1} className={styles.ButtonIcon} />
        <span>Пополнить</span>
      </Button>
      <ModalBalance {...{ isOpen, setOpen }} />
    </div>
  );
};

export default Balance;
