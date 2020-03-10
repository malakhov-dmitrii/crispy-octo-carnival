import React, { FC } from 'react';
import styles from './Modal.module.scss';
import { Modal as AntModal, Button } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import cn from 'classnames';
import { Close } from '../../../Icons/NavSvg';

const Modal: FC<ModalProps> = props => {
  const { children, onCancel, title, cancelText, okText } = props;

  const footer = props.footer ? (
    props.footer
  ) : (
    <>
      <Button className={styles.Cancel} onClick={onCancel}>
        {cancelText || 'Cancel'}
      </Button>
      <Button type="primary">{okText || 'Ok'}</Button>
    </>
  );

  return (
    <AntModal {...props} footer={null} className={cn(props.className, styles.Modal)}>
      <div className={styles.Header}>
        <div className={styles.Title}>{title}</div>
        <Button onClick={onCancel} type="link">
          <Close size={9} />
        </Button>
      </div>
      <div className={styles.Body}>{children}</div>
      <div className={styles.Footer}>{footer}</div>
    </AntModal>
  );
};

export default Modal;
