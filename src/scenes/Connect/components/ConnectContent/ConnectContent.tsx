import React, { FC } from 'react';
import ConnectEmployee from './components/ConnectEmployee';
import ConnectPending from './components/ConnectPending';
import { LegalEntityItem } from '../../../../store/LegalEntities/legalEntities.reducer';

interface ConnectContentProps {
  role: string;
  organization: LegalEntityItem;
}

const ConnectContent: FC<ConnectContentProps> = ({ organization, role }) => (
  <>
    {organization.status === 'active' && role === 'employee' && <ConnectEmployee organization={organization} />}
    {organization.status === 'chiefRequestSubmitted' && <ConnectPending organization={organization} />}
  </>
);

export default ConnectContent;
