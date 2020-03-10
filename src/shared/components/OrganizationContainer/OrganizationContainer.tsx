import React, { useEffect } from 'react';
import styles from './OrganizationContainer.module.scss';
import cn from 'classnames';
import OrganizationWrapper from '../OrganizationWrapper';
import RouteContent from './RouteContent';
import { Card } from 'antd';
import routes from '../../../routes';
import { Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ConfigActions } from '../../../store/Config/config.actions';
import { useLocalAuth } from '../../utils';
import { Store } from '../../../store';
import Alert from './components/Alert';

const OrganizationContainer = () => {
  const id = useHistory().location.pathname.split('/')[2];
  const dispatch = useDispatch();
  const localAuth = useLocalAuth();
  const { activeOrganizationId } = useSelector((state: Store) => state.config);

  useEffect(() => {
    if (localAuth) {
      dispatch({
        type: ConfigActions.GetActiveOrganiztionAccessToken,
        payload: { legalEntityExternalId: id, refreshToken: localAuth.refreshToken },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  useEffect(() => {
    if (activeOrganizationId) dispatch({ type: ConfigActions.GetConfig });
  }, [activeOrganizationId, dispatch]);

  return (
    <OrganizationWrapper>
      {routes
        .filter(({ useWith }) => useWith.includes('organization'))
        .map(({ id, path, params = '', useWith, children: Component }) => (
          <Route
            key={id}
            path={`/organization/:id/:page(${path})${params}`}
            component={() => (
              <>
                <Alert />
                <Card className={cn(styles.Card)}>
                  <RouteContent sidebar={useWith.includes('sidebar')}>
                    <Component />
                  </RouteContent>
                </Card>
              </>
            )}
            exact={path === '/'}
          />
        ))}
    </OrganizationWrapper>
  );
};

export default OrganizationContainer;
