import React, { FC } from 'react';
import styles from './Sidebar.module.scss';
import Balance from './components/Balance';
import SideMenu from './components/SideMenu';
import Button from '../AntOverrides/Button';
import { Mail } from '../../Icons/NavSvg';

const Sidebar: FC = () => {
  return (
    <div className={styles.Sidebar}>
      <Balance />
      <SideMenu />
      <Button className={styles.CallbackButton}>
        <Mail />
        <span>Обратная связь</span>
      </Button>
    </div>
  );
};

export default Sidebar;
