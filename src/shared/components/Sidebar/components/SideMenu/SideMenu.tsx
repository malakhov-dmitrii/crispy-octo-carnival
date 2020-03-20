import React from 'react';
import styles from './SideMenu.module.scss';
import { Menu } from 'antd';
import routes from '../../../../../routes';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import { Abonement, Check, History, Parkings, Box, Reconciliation } from '../../../../Icons/NavSvg';

const icons: any = {
  parkings: Parkings,
  history: History,
  abonement: Abonement,
  check: Check,
  box: Box,
  reconciliation: Reconciliation,
};

const SideMenu = () => {
  const { params } = useRouteMatch();
  const activeRouteId = routes.find(r => r.path === params.page)?.id;

  return (
    <Menu selectedKeys={[activeRouteId ? String(activeRouteId) : '1']} className={styles.Menu}>
      {routes
        .filter(route => route.useWith.some(i => i === 'sidebar'))
        .map((route: any) => {
          const Icon = icons[route.icon || 'parkings'];
          return (
            <Menu.Item key={String(route.id)} className={styles.MenuItem}>
              <Link to={`/organization/${params.id}/${route.path}`} className={styles.Link}>
                <Icon className={styles.Icon} />
                <span className={styles.LinkTitle}>{route.title || 'Неизвестно'}</span>
              </Link>
            </Menu.Item>
          );
        })}
    </Menu>
  );
};

export default SideMenu;
