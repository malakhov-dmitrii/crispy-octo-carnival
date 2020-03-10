import React, { useEffect } from 'react';
import styles from './CardWithSidebar.module.scss';
import cn from 'classnames';
import Sidebar from '../Sidebar';
import { Card } from 'antd';
import routes from '../../../routes';
import { Route, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ConfigActions } from '../../../store/Config/config.actions';
import { useLocalAuth } from '../../utils';

const CardWithSidebar = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const localAuth = useLocalAuth();

  useEffect(() => {
    if (localAuth) {
      dispatch({
        type: ConfigActions.GetActiveOrganiztionAccessToken,
        payload: { legalEntityExternalId: id, refreshToken: localAuth.refreshToken },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  return (
    <Card className={cn(styles.Card)}>
      <div className={styles.FlexWrapper}>
        <Sidebar />

        <div className={styles.CardBody}>
          {routes
            .filter(route => route.useWith.length !== 0)
            .map(route => (
              <Route
                key={route.path}
                path={`/organization/:id/${route.path}`}
                component={route.children}
                exact={route.path === '/'}
              />
            ))}
        </div>
      </div>
    </Card>
  );
};

export default CardWithSidebar;
