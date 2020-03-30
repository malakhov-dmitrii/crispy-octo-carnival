import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { More, Edit, Clone, Default, Delete } from '../../../../../../shared/Icons/NavSvg';
import cn from 'classnames';
import styles from './MoreMenu.module.scss';
// import { TransportsReservation } from '../../../../store/Transport/transports.reducer';

interface MenuMore {
  //** Ключ для маски SVG */
  vehicle: any;
}

const MoreMenu = ({ vehicle }: MenuMore) => {
  const menu = (
    <Menu>
      <Menu.Item key="0" className={styles.Item}>
        <Edit size={14} className={styles.Icon} mask={vehicle._id} /> Переименовать
      </Menu.Item>
      <Menu.Item key="1" className={styles.Item}>
        <Clone size={14} className={styles.Icon} mask={vehicle._id} /> Сделать копию
      </Menu.Item>
      <Menu.Item key="2" className={styles.Item}>
        <Default size={14} className={styles.Icon} mask={vehicle._id} /> По умолчанию
      </Menu.Item>
      <Menu.Item key="3" className={styles.Item}>
        <Delete size={14} className={styles.Icon} mask={vehicle._id} /> Удалить
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={cn(styles.MoreMenu)}>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button shape="circle">
          <More size={16} />
        </Button>
      </Dropdown>
    </div>
  );
};

export default MoreMenu;
