import React, { FC } from 'react';
import cn from 'classnames';
import NumberFormat from 'react-number-format';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';

import Modal from '../../../../../AntOverrides/ModalForm';
import FormRowItem from '../../../../../FormRowItem';
import { ReceiptsActions } from '../../../../../../../store/Receipts/receipts.actions';
import styles from './MailWindow.module.scss';

interface MailWindow {
  isOpenWindowMail: boolean;
  setOpenWindowMail: { (props: boolean): void };
  _id?: number;
  createDate?: string;
  sum?: number;
}

const MailWindow: FC<MailWindow> = ({ isOpenWindowMail, setOpenWindowMail, _id = 0, createDate = '', sum = 0 }) => {
  const dispatch = useDispatch();

  const modalOptions = {
    visible: isOpenWindowMail,
    onCancel: () => setOpenWindowMail(false),
    title: 'Отправить на email',
    width: '640px',
    okText: 'Отправить',
    cancelText: 'Отмена',
  };

  const initialValues = { email: '' };

  const validate = (values: any) => {
    const errors: any = {};
    const input = document.createElement('input');

    input.type = 'email';
    input.value = values.email;
    if (values.email === '') errors.email = 'Введите Email';
    else if (!input.validity.valid || !values.email) errors.email = 'Неверный формат';

    return errors;
  };

  const onSubmit = (data: any, { resetForm }: any) => {
    dispatch({
      type: ReceiptsActions.SendInvoiceReceipts,
      payload: {
        receiptId: _id,
        data,
      },
    });
    setTimeout(resetForm(initialValues), 400);
    setOpenWindowMail(false);
  };
  const getBodyForm = ({ handleChange, values, errors }: any) => (
    <div className={cn({ [styles.HasError]: errors.email }, styles.MailWindow)}>
      <p>
        {`№ ${_id} от ${createDate.split('T')[0]}		Пополнение баланса		`}
        <NumberFormat value={sum} displayType={'text'} thousandSeparator={' '} suffix={' ₽'} />
      </p>
      <FormRowItem label="Email" error={errors.email}>
        <Input type="text" name="email" onChange={handleChange} value={values.email} />
      </FormRowItem>
    </div>
  );

  const formikOptions = {
    initialValues,
    validate,
    onSubmit,
  };

  return <Modal {...{ modalOptions, formikOptions, getBodyForm }} />;
};

export default MailWindow;
