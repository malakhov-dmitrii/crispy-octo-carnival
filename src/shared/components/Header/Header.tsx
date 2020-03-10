/* eslint-disable no-restricted-globals */
import React from 'react';
import styles from './Header.module.scss';
import { Logo } from '../../Icons/NavSvg/NavSvg';
import NavMenu from './components/NavMenu';
import { useHistory, Redirect } from 'react-router';
import { useLocalAuth } from '../../utils';

const Header = () => {
  const history = useHistory();
  const localAuth = useLocalAuth();
  if (!localAuth && history.location.pathname !== '/') return <Redirect to="/" />;

  return (
    <div className={styles.Header}>
      <div className={styles.HeaderContent}>
        <div className={styles.Flex}>
          <Logo />

          <div className={styles.NavRow}>
            <a className={styles.Link} href="/">
              Портал
            </a>
            <a className={styles.Link} href="/">
              Кабинет организации
            </a>
            <a className={styles.Link} href="https://lk.parkingtest.ru/auth/login">
              Личный кабинет
            </a>
          </div>
        </div>
        <NavMenu />
      </div>
    </div>
  );
};

export default Header;
