import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from 'antd';
import cn from 'classnames';

import styles from './ModlBalance.module.scss';
import { ReceiptsActions } from '../../../../../../../store/Receipts/receipts.actions';
import ModalForm from '../../../../../AntOverrides/ModalForm';

interface ModalBalance {
  isOpen: boolean;
  setOpen: { (props: boolean): void };
}

const ModalBalance: FC<ModalBalance> = ({ isOpen, setOpen }) => {
  const dispatch = useDispatch();

  const modalOptions = {
    title: 'Пополнение баланса',
    cancelText: 'Отмена',
    okText: 'Сформировать счет',
    footer: null,
    header: null,
    visible: isOpen,
    width: 384,
    onCancel: () => setOpen(false),
  };

  const inputOptions = {
    placeholder: 'Введите сумму пополнения',
    type: 'number',
  };

  const initialValues = { sum: '' };
  const validate = (values: any) => {
    const errors: any = {};

    if (+values.sum < 1) errors.sum = 'Введите сумму пополнения';

    return errors;
  };
  const onSubmit = (values: any, { resetForm }: any) => {
    const { sum } = values;
    dispatch({
      type: ReceiptsActions.CreateReceipts,
      payload: {
        sum: sum * 100,
        type: 'refill',
      },
    });
    setTimeout(resetForm(initialValues), 400);
    setOpen(false);
  };
  const getBodyForm = ({ handleChange, handleBlur, values, errors }: any) => (
    <div className={cn({ [styles.HasError]: errors.sum })}>
      <Input {...inputOptions} name="sum" onChange={handleChange} onBlur={handleBlur} value={values.sum} />
    </div>
  );
  const formikOptions = {
    initialValues,
    validate,
    onSubmit,
  };

  return <ModalForm {...{ modalOptions, formikOptions, getBodyForm }} />;
};

export default ModalBalance;
