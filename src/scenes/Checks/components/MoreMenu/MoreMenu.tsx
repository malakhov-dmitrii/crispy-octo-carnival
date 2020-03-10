import React, { useState } from 'react';
import styles from './MoreMenu.module.scss';
import { Menu, Dropdown } from 'antd';
import { More, Print, PDF, Mail, Clone } from '../../../../shared/Icons/NavSvg';
import { Receipt } from '../../../../store/Receipts/receipts.reducer';
import { useDispatch } from 'react-redux';
import { ReceiptsActions } from '../../../../store/Receipts/receipts.actions';
import MailWindow from '../../../../shared/components/OrganizationWrapper/component/CreatorCheck/component/MailWindow';

const MoreMenu = (props: Receipt) => {
  const dispatch = useDispatch();

  const [isOpenWindowMail, setOpenWindowMail] = useState(false);

  const menu = (
    <Menu>
      <Menu.Item
        key="0"
        className={styles.Item}
        onClick={() =>
          dispatch({
            type: ReceiptsActions.DownloadReceipts,
            payload: { id: props._id, type: 'Print' },
          })
        }
      >
        <Print size={14} className={styles.Icon} mask={props._id} /> Распечатать
      </Menu.Item>
      <Menu.Item
        key="0"
        className={styles.Item}
        onClick={() =>
          dispatch({
            type: ReceiptsActions.DownloadReceipts,
            payload: { id: props._id, type: 'Download' },
          })
        }
      >
        <PDF size={14} className={styles.Icon} mask={props._id} /> Скачать в PDF
      </Menu.Item>
      <Menu.Item key="0" className={styles.Item} onClick={() => setOpenWindowMail(true)}>
        <Mail size={14} className={styles.Icon} mask={props._id} /> Отправить на Email
      </Menu.Item>
      <Menu.Item
        key="0"
        className={styles.Item}
        onClick={() =>
          dispatch({
            type: ReceiptsActions.CreateReceipts,
            payload: {
              sum: props.sum,
              type: 'refill',
            },
          })
        }
      >
        <Clone size={14} className={styles.Icon} mask={props._id} /> Создать по образцу
      </Menu.Item>

      {/* Обсудили, пока не делаем */}

      {/* <Menu.Item key="0" className={styles.Item}>
        <Delete size={14} className={styles.Icon} mask={props._id} /> Удалить
      </Menu.Item> */}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" href="#top">
          <More size={16} />
        </a>
      </Dropdown>
      <MailWindow {...{ isOpenWindowMail, setOpenWindowMail, ...props }} />
    </>
  );
};

export default MoreMenu;
