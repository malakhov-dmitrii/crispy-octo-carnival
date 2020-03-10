import React, { FC, useState, useEffect } from 'react';
import MailWindow from './component/MailWindow';
import CheckWindow from './component/CheckWindow';
import { useSelector } from 'react-redux';
import { Store } from '../../../../../store';
import { Check } from '../../../../../store/OrganizationWrapper/organizationWrapper.reducer';

const CreatorCheck: FC = () => {
  const check: Check | undefined = useSelector((state: Store) => state.organizationWrapper.data.check);

  const [isOpenWindowCheck, setOpenWindowCheck] = useState(false);
  const [isOpenWindowMail, setOpenWindowMail] = useState(false);

  useEffect(() => {
    if (check) {
      setOpenWindowCheck(true);
    }
  }, [check]);

  return (
    <>
      <CheckWindow {...{ isOpenWindowCheck, setOpenWindowCheck, ...check, setOpenWindowMail }} />
      <MailWindow {...{ isOpenWindowMail, setOpenWindowMail, ...check }} />
    </>
  );
};

export default CreatorCheck;
