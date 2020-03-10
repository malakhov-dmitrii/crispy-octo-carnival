import React, { useEffect } from 'react';
import Title from 'antd/lib/typography/Title';
import DataTable from './components/DataTable';
import { useDispatch } from 'react-redux';
import { ReceiptsActions } from '../../store/Receipts/receipts.actions';

const Checks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ReceiptsActions.GetReceipts });
  }, [dispatch]);
  return (
    <>
      <Title>Счета</Title>

      <DataTable />
    </>
  );
};

export default Checks;
