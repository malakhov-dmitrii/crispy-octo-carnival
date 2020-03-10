import React, { FC } from 'react';
import CreatorCheck from './component/CreatorCheck';

const OrganizationWrapper: FC = ({ children }) => {
  /* TODO: CheckCreator - "создатель чеков"
   *  CreatorCheck - "проверка создателя"
   */
  return (
    <>
      <CreatorCheck />
      {children}
    </>
  );
};

export default OrganizationWrapper;
