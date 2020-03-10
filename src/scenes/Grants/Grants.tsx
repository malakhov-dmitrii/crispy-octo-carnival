import React, { useEffect, useState } from 'react';
import DataTable from './components/DataTable';
import { useDispatch } from 'react-redux';
import { GrantsActions } from '../../store/Grants/grants.actions';
import { AbonementsActions } from '../../store/Abonements/abonements.actions';
import Head from './components/Head';
import AddModal from './components/AddModal';

const Grants = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GrantsActions.GetGrants });
    dispatch({ type: AbonementsActions.GetAbonements });
  }, [dispatch]);

  return (
    <>
      <Head {...{ setIsModalVisible }} />
      <DataTable />
      <AddModal {...{ setIsModalVisible, isModalVisible }} />
    </>
  );
};

export default Grants;
