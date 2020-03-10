import React, { useEffect } from 'react';
import Title from 'antd/lib/typography/Title';
import { ZonesActions } from '../../store/Zones/zones.actions';
import { useSelector, useDispatch } from 'react-redux';
import { ParkingsActions } from '../../store/Parkings/parkings.actions';
import ParkingForm from './components/ParkingForm';
import DataTable from './components/DataTable';
import { Store } from '../../store';

const Parkings = () => {
  const dispatch = useDispatch();
  const { activeOrganizationId } = useSelector((state: Store) => state.config);

  const { items } = useSelector((state: Store) => state.zones.data);

  useEffect(() => {
    if (activeOrganizationId) {
      dispatch({ type: ParkingsActions.GetParkings });
      dispatch({ type: ZonesActions.GetZones });
    }
  }, [dispatch, activeOrganizationId]);

  return (
    <>
      <Title>Парковки</Title>
      <ParkingForm zones={items} />

      <DataTable />
    </>
  );
};

export default Parkings;
