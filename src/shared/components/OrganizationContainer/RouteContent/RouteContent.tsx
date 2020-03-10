import React, { FC, ReactNode } from 'react';
import styles from './RouteContent.module.scss';
import Sidebar from '../../Sidebar';

interface RouteContentProps {
  sidebar: boolean;
  children: ReactNode;
}

const RouteContent: FC<RouteContentProps> = ({ sidebar, children }) => (
  <div className={styles.FlexWrapper}>
    {sidebar && <Sidebar />}
    <div className={styles.CardBody}>{children}</div>
  </div>
);

export default RouteContent;
