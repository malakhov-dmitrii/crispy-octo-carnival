import React, { useEffect } from 'react';
import styles from './LimitSets.module.scss';
import cn from 'classnames';
import Head from './components/Head';
import DataTable from './components/DataTable';
import { useDispatch } from 'react-redux';
import { LimitSetsActions } from '../../store/LimitSets/limitSets.actions';

const LimitSets = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LimitSetsActions.GetLimitSets,
    });
  }, [dispatch]);
  return (
    <div className={cn(styles.LimitSets)}>
      <Head />
      <DataTable />
    </div>
  );
};

export default LimitSets;
