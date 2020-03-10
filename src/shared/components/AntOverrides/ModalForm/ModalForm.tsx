import React, { FC } from 'react';
import { Formik } from 'formik';
import { Modal, Button } from 'antd';
import { Close } from '../../../Icons/NavSvg';
import cn from 'classnames';
import { ModalProps } from 'antd/lib/modal';

import styles from './ModalForm.module.scss';

interface ModalForm extends ModalProps {
  modalOptions: any;
  formikOptions: any;
  getBodyForm: any;
}

const ModalForm: FC<ModalForm> = props => {
  const { modalOptions, formikOptions, getBodyForm } = props;

  return (
    <Modal {...modalOptions} footer={null} className={cn(props.className, styles.ModalForm)}>
      <Formik {...formikOptions} validateOnChange={false}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, resetForm }) => (
          <form onSubmit={handleSubmit}>
            <div className={styles.Header}>
              <div className={styles.Title}>{modalOptions.title}</div>
              <Button
                onClick={() => {
                  resetForm(formikOptions.initialValues);
                  modalOptions.onCancel();
                }}
                type="link"
              >
                <Close size={9} />
              </Button>
            </div>
            <div className={styles.Body}>{getBodyForm({ handleChange, handleBlur, values, errors, touched })}</div>
            <div className={styles.Footer}>
              <Button
                disabled={isSubmitting}
                className={styles.Cancel}
                onClick={() => {
                  resetForm(formikOptions.initialValues);
                  modalOptions.onCancel();
                }}
              >
                {modalOptions.cancelText || 'Cancel'}
              </Button>
              <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                {modalOptions.okText || 'Ok'}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalForm;
