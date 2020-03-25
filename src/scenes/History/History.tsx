import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Title from 'antd/lib/typography/Title';
import styles from './History.module.scss';
import { Select, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { Store } from '../../store';
import { HistoryActions } from '../../store/History/history.actions';
import DataTable from './components/DataTable';
import HistoryForm from './components/HistoryForm';
import { ZonesActions } from '../../store/Zones/zones.actions';

const { Option } = Select;

interface Filter {
  type: string;
  zoneNumber: any;
  vrp: string;
  start: any;
  end: any;
}

const History = () => {
  const zonesList = useSelector((state: Store) => state.zones.data.items);
  const HistoryItemsTotal = useSelector((state: Store) => state.history.data.total);

  const dispatch = useDispatch();
  const [filter, setFilter]: [any, any] = useState({
    type: '',
    zoneNumber: '',
    start: moment(),
    end: moment(),
  });

  const handleFilter = (params: any) => {
    setFilter({ ...filter, ...params });
  };

  useEffect(() => {
    dispatch({ type: ZonesActions.GetZones });
  }, [dispatch]);

  useEffect(() => {
    const payload: any = {
      start: filter?.start?.format('YYYY-MM-DD'),
      end: filter?.end?.format('YYYY-MM-DD'),
    };

    filter.type && (payload.type = filter.type);
    filter.zoneNumber && (payload.zoneNumber = filter.zoneNumber);
    filter.vrp && (payload.vrp = filter.vrp);
    dispatch({
      type: HistoryActions.GetHistory,
      payload,
    });
  }, [dispatch, filter]);

  const SelectExport = (
    <Select
      disabled={!HistoryItemsTotal}
      value="Выгрузить"
      onChange={(format: string) =>
        dispatch({
          type: HistoryActions.DownloadHistory,
          payload: {
            format,
            start: filter.start?.format('YYYY-MM-DD'),
            end: filter.end?.format('YYYY-MM-DD'),
          },
        })
      }
    >
      <Option value="pdf">Adobe (pdf)</Option>
      <Option value="csv">Текстовый (CSV)</Option>
      <Option value="docx">Word (docx)</Option>
    </Select>
  );

  const Head = (
    <Row type="flex" justify="start" align="middle">
      <Col className={styles.FlexGrowOne}>
        <Title>История операций</Title>
      </Col>
      <Col>{SelectExport}</Col>
    </Row>
  );

  return (
    <>
      {Head}
      <HistoryForm {...{ filter, handleFilter, zonesList }} />
      <DataTable />
    </>
  );
};

export default History;
