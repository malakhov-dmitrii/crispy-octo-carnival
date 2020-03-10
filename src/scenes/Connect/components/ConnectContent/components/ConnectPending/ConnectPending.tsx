import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
import Button from '../../../../../../shared/components/AntOverrides/Button/index';
import Clocks from '../../../../../../shared/Icons/Clocks/index';
import { LegalEntityItem } from '../../../../../../store/LegalEntities/legalEntities.reducer';
import styles from './ConnectPending.module.scss';

interface ConnectPending {
  organization: LegalEntityItem;
}

const ConnectPending: FC<ConnectPending> = ({ organization }) => {
  return (
    <>
      <Title>Заявка на рассмотрении</Title>
      <Title level={3}>{organization.legalEntityInfo.fullName}</Title>
      <p className={styles.SubTitle}>Заявка на подключение создана 23.12.2020 пользователем Константин К.</p>
      <Clocks />
      <p>Срок рассмотрения заявки 5 рабочих дней.</p>
      <p>
        Подтверждение, что организация подключена, отправим на электронную почту
        <br />
        <span className={styles.SubTitle}>kon@stantinopolsky.ru</span>
      </p>
      <Link to="/">
        <Button type="primary">Выбрать другую организацию</Button>
      </Link>
    </>
  );
};

export default ConnectPending;
