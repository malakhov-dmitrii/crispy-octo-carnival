import React, { useEffect, FC } from 'react';
import styles from './Connect.module.scss';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'antd';
import { LegalEntityItem } from '../../store/LegalEntities/legalEntities.reducer';
import ConnectContent from './components/ConnectContent';
import { useLocalAuth } from '../../shared/utils';
import { Store } from '../../store';
import { ConfigActions } from '../../store/Config/config.actions';
import { LegalEntitiesActions } from '../../store/LegalEntities/legalEntities.actions';

const Connect: FC = () => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const localAuth = useLocalAuth();

  const legalEntity = useSelector((state: Store) =>
    state.legalEntities.items.find(({ externalId }: LegalEntityItem) => externalId === parseInt(params.id)),
  );

  useEffect(() => {
    dispatch({ type: LegalEntitiesActions.GetLegalEntities });
  }, [dispatch]);

  useEffect(() => {
    if (localAuth && legalEntity && legalEntity.status === 'active') {
      dispatch({
        type: ConfigActions.GetActiveOrganiztionAccessToken,
        payload: { legalEntityExternalId: params.id, refreshToken: localAuth.refreshToken },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, dispatch, legalEntity]);

  return (
    <div className={styles.Root}>
      <Card className={styles.Card}>
        {!!legalEntity && <ConnectContent organization={legalEntity} role={params.role} />}
      </Card>
    </div>
  );
};

export default Connect;
