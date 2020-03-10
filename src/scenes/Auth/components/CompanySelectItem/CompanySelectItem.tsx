import React, { FC } from 'react';
import styles from './CompanySelectItem.module.scss';
import { Link } from 'react-router-dom';

const STATUSES = {
  ACTIVE: {
    statusText: 'Подключена',
    action: {
      text: 'Войти',
      getLink: (id: number) => `organization/${id}/parkings`,
    },
  },
  NO_ACTIVE: {
    statusText: 'Не подключена',
    action: {
      text: 'Подключить',
      getLink: (id: number) => `organization/${id}/parkings`,
    },
  },
  NO_PROXY: {
    statusText: 'Не подключена, требуется доверенность',
    action: {
      text: 'Подключить',
      getLink: (id: number, employeeRoles: string[]) => {
        const path = `organization/${id}/connect`;

        switch (true) {
          case employeeRoles.includes('chief'):
            return `${path}/chief`;
          case employeeRoles.includes('employee'):
          default:
            return `${path}/employee`;
        }
      },
    },
  },
  DISABLED: {
    statusText: 'Подключение недоступно. Заполните недостающие данные на портале Госуслуг.',
    action: {
      text: 'ЗАПОЛНИТЬ ДАННЫЕ',
      getLink: () => 'https://www.gosuslugi.ru',
    },
  },
};

interface InterfaceCompanySelectItem {
  id: number;
  name: string;
  employeeRoles: string[];
  status: 'ACTIVE' | 'NO_ACTIVE' | 'NO_PROXY' | 'DISABLED';
}

const CompanySelectItem: FC<InterfaceCompanySelectItem> = ({ id, name, employeeRoles, status = 'DISABLED' }) => {
  const { action, statusText } = STATUSES[status];
  const item = (
    <>
      <dl style={{ flexGrow: 1 }}>
        <dd className={styles.Name}>{name}</dd>
        <dd className={styles.Status}>{statusText}</dd>
      </dl>

      <span>{action.text}</span>
    </>
  );

  return (
    <div className={styles.CompanySelectItem}>
      {status === 'DISABLED' ? (
        <a href={action.getLink(id, employeeRoles)} target="_blank" rel="noopener noreferrer">
          {item}
        </a>
      ) : (
        <Link to={action.getLink(id, employeeRoles)}>{item}</Link>
      )}
    </div>
  );
};

export default CompanySelectItem;
