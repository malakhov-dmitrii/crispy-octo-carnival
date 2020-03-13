import React, { useEffect } from 'react';
import styles from './Auth.module.scss';
import Title from 'antd/lib/typography/Title';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { ConfigActions } from '../../store/Config/config.actions';
import { LegalEntitiesActions } from '../../store/LegalEntities/legalEntities.actions';
import CompanySelect from './components/CompanySelect';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { useLocalAuth } from '../../shared/utils';
import { env } from '../../App';

const Auth = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const localAuth = useLocalAuth();

  useEffect(() => {
    if (localAuth) {
      dispatch({ type: LegalEntitiesActions.GetLegalEntities });
    } else if (!history.location.search) {
      document.location.href = `${env.REACT_APP_LOGIN_URL}?returnUrl=${env.REACT_APP_HOST_NAME}`;
    } else {
      const token = history.location.search.split('=')[1];
      dispatch({ type: ConfigActions.GetFromOneTimeToken, payload: token });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, history.location.search]);

  return (
    <div className={styles.Root}>
      <Card className={styles.Card}>
        <div className={styles.Welcome}>
          <Title>Выбор организации</Title>

          <p>Выберите, от какой организации вы действуете</p>

          <CompanySelect />

          <p>
            Нужной организации нет в списке? <Link to="/"> Добавить на портале Госуслуг</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
