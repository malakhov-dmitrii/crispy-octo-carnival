import React, { FC } from 'react';
import Button from '../../../../../../../../../../shared/components/AntOverrides/Button';
import { Delete } from '../../../../../../../../../../shared/Icons/NavSvg';
import { Grant } from '../../../../../../AddModal';

interface ButtonDelete {
  index: number;
  setAbonements: { (props: any): void };
  selectedAbonements: Grant[];
}

const ButtonDelete: FC<ButtonDelete> = ({ index, setAbonements, selectedAbonements }) => {
  const deleteElement = () => {
    setAbonements([...selectedAbonements].filter((item, iDx) => iDx !== index));
  };

  return selectedAbonements.length > 1 ? (
    <Button shape="circle" onClick={deleteElement}>
      <Delete />
    </Button>
  ) : null;
};

export default ButtonDelete;
