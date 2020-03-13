import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import NumberFormat from 'react-number-format';
import { useRouteMatch } from 'react-router-dom';

import styles from './CheckWindow.module.scss';
import Modal from '../../../../../AntOverrides/Modal';
import { Print, PDF, Mail } from '../../../../../../Icons/NavSvg';
import Link from '../../../../../AntOverrides/Link';
import { ReceiptsActions } from '../../../../../../../store/Receipts/receipts.actions';

interface SetOpen {
  (props: boolean): void;
}

interface CheckWindow {
  isOpenWindowCheck: boolean;
  setOpenWindowCheck: SetOpen;
  setOpenWindowMail: SetOpen;
  _id?: number;
  createDate?: string;
  sum?: number;
}

const CheckWindow: FC<CheckWindow> = ({
  isOpenWindowCheck,
  setOpenWindowCheck,
  _id = 0,
  createDate = '',
  sum = 0,
  setOpenWindowMail,
}) => {
  const { params } = useRouteMatch();

  const dispatch = useDispatch();

  const onCancel = () => setOpenWindowCheck(false);

  const modalOptions = {
    visible: isOpenWindowCheck,
    title: 'Cформирован счет',
    width: '640px',
    footer: (
      <Button type="primary" onClick={onCancel}>
        Закрыть
      </Button>
    ),
  };

  return (
    <Modal {...modalOptions} onCancel={onCancel} className={styles.CheckWindow}>
      <p>
        {`№ ${_id} от ${createDate.split('T')[0]}		Пополнение баланса		`}
        <NumberFormat
          value={(sum / 100).toFixed(2)}
          displayType={'text'}
          thousandSeparator={' '}
          decimalScale={2}
          suffix={' ₽'}
        />
      </p>
      <p>
        <Button
          onClick={() => {
            dispatch({
              type: ReceiptsActions.DownloadReceipts,
              payload: { id: _id, type: 'Print' },
            });
          }}
        >
          <Print width={14} height={12} /> Распечатать
        </Button>
        <Button
          onClick={() => {
            dispatch({
              type: ReceiptsActions.DownloadReceipts,
              payload: { id: _id, type: 'Download' },
            });
          }}
        >
          <PDF width={14} height={12} /> Скачать PDF
        </Button>
        <Button
          onClick={() => {
            onCancel();
            setOpenWindowMail(true);
          }}
        >
          <Mail width={14} height={12} /> Отправить на email
        </Button>
      </p>
      <p>
        Поступление средств проверяйте в разделе{' '}
        <Link to={`/organization/${params.id}/checks`} onClick={() => setOpenWindowCheck(false)}>
          Счета
        </Link>
      </p>
    </Modal>
  );
};

export default CheckWindow;
