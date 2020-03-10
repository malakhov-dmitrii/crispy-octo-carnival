import React, { FC, useState } from 'react';
import { Steps, Typography } from 'antd';
import styles from './ConnectEmployee.module.scss';
import ConnectOffer from '../ConnectOffer/index';
import PowerOfAttorney from '../PowerOfAttorney/index';
import { useDispatch } from 'react-redux';
import { LegalEntityItem } from '../../../../../../store/LegalEntities/legalEntities.reducer';
import { LegalEntitiesActions } from '../../../../../../store/LegalEntities/legalEntities.actions';

const { Step } = Steps;
const { Title } = Typography;

interface ConnectEmployeeProps {
  organization: LegalEntityItem;
}

const ConnectEmployee: FC<ConnectEmployeeProps> = ({ organization }) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(0);
  const [data, setFormData] = useState({
    email: '',
    powerOfAttorneyFile: undefined,
  });

  const handlerSubmit = () => {
    const formData = new FormData();

    formData.append('email', data.email);
    formData.append('powerOfAttorneyFile', data.powerOfAttorneyFile || '');

    dispatch({ type: LegalEntitiesActions.CreateChiefRequest, payload: formData });
  };

  return (
    <>
      <Title>Подключить организацию</Title>
      <Title level={3}>{organization.legalEntityInfo.fullName}</Title>
      <Steps current={step} className={styles.Steps}>
        <Step title="Доверенность" />
        <Step title="Оферта" />
      </Steps>
      {step === 0 && (
        <PowerOfAttorney
          values={data}
          handlerSubmit={(data: any) => {
            setFormData(data);
            setStep(1);
          }}
        />
      )}
      {step === 1 && <ConnectOffer handlePrewStep={() => setStep(0)} handlerSubmit={handlerSubmit} />}
    </>
  );
};

export default ConnectEmployee;
