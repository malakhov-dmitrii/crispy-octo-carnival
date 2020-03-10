import React, { FC } from 'react';
import styles from './CompanySelect.module.scss';
import CompanySelectItem from '../CompanySelectItem';
import { useSelector } from 'react-redux';
import { Store } from '../../../../store';

const getStatus = (company: any) => {
  const { status = null, validityInfo = {}, employeeRoles = [] } = company;

  const isExistChefRole = employeeRoles && employeeRoles.includes('chief');

  if (validityInfo.valid === true) {
    // Организая подключена
    if (status === 'active') {
      return 'ACTIVE';
    }

    // Организация может быть подключена
    if (isExistChefRole) {
      return 'NO_ACTIVE';
    }

    // Организация может быть подключена после загрузки доверенности
    if (!isExistChefRole) {
      return 'NO_PROXY';
    }
  }

  // Организация не может быть подключена
  return 'DISABLED';
};

const CompanySelect: FC = () => {
  const list = useSelector((state: Store) => state.legalEntities.items);

  return (
    <div className={styles.CompanySelect}>
      {!!list.length && (
        <ul>
          {list.map((company: any, index: number) => (
            <li key={index}>
              <CompanySelectItem
                id={company.externalId}
                name={company.legalEntityInfo.fullName}
                employeeRoles={company.employeeRoles}
                status={getStatus(company)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompanySelect;
