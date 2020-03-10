import React, { useEffect, FC } from 'react';
import { hot } from 'react-hot-loader/root';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import Header from './shared/components/Header';
import Footer from './shared/components/Footer';
import styles from './App.module.scss';
import { useDispatch } from 'react-redux';
import OrganizationContainer from './shared/components/OrganizationContainer';
import NotFound from './shared/components/NotFound';
import { ConfigActions } from './store/Config/config.actions';
import { useLocalAuth } from './shared/utils';
import Notification from './shared/components/Notification';

const App: FC = () => {
  const dispatch = useDispatch();
  const localAuth = useLocalAuth();

  useEffect(() => {
    if (localAuth) {
      dispatch({ type: ConfigActions.RestoreStateFromLocal, payload: localAuth });
    }

    dispatch({ type: ConfigActions.GetConfig });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <Router basename="/legalcabinet">
        <div className={styles.FlexColumn}>
          <div>
            <Header />

            <Switch>
              {routes
                .filter(({ useWith }: any) => !useWith.includes('organization'))
                .map(route => (
                  <Route key={route.path} path={route.path} component={route.children} exact={route.path === '/'} />
                ))}

              <Route path="/undefined" component={NotFound} />

              <OrganizationContainer />
            </Switch>
          </div>

          <Footer />
        </div>
        <Notification />
      </Router>
    </>
  );
};

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
