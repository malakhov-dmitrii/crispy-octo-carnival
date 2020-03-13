import React, { FC } from 'react';
import { Col, Input, Upload, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from './PowerOfAttorney.module.scss';
import InboxOutlined from '../../../../../../shared/Icons/InboxOutlined/index';
import Button from '../../../../../../shared/components/AntOverrides/Button/index';
import { mimeTypes } from '../../../../../../shared/utils/index';

const { Dragger } = Upload;
const { Text } = Typography;

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required('Выберите email'),
  powerOfAttorneyFile: yup
    .mixed()
    .test('name', 'Выберите файл', value => value?.name)
    .test('type', 'Не корректное расширение файла', value => mimeTypes.includes(value?.type)),
});

interface PowerOfAttorney {
  handlerSubmit: { (props: any): void };
  values: {
    email?: string;
    powerOfAttorneyFile?: File;
  };
}

const PowerOfAttorney: FC<PowerOfAttorney> = ({ handlerSubmit, values }) => {
  const formik = useFormik({
    initialValues: values,
    validationSchema,
    onSubmit: handlerSubmit,
    validateOnChange: false,
  });

  const fileList = formik.values.powerOfAttorneyFile ? [formik.values.powerOfAttorneyFile] : ([] as any);

  return (
    <form onSubmit={formik.handleSubmit}>
      <p>Вы не руководитель организации, приложите доверенность.</p>

      <p className={styles.SubTitle}>Скан доверенности</p>
      <Dragger
        className={styles.Dragger}
        name="powerOfAttorneyFile"
        fileList={fileList}
        beforeUpload={(file: File) => {
          formik.setFieldValue('powerOfAttorneyFile', file);
          return false;
        }}
      >
        <InboxOutlined size={47} fill={styles.green} />
        <p>Нажмите или перетащите файл сюда, чтобы загрузить его</p>
        <span>Разрешены：.rar .zip .doc .docx .pdf .jpg</span>
      </Dragger>
      <Text type="danger">{formik.errors.powerOfAttorneyFile}</Text>

      <Row justify="space-between" align="bottom" type="flex">
        <Col xs={12} sm={10}>
          <p className={styles.SubTitle}>Скан доверенности</p>
          <Input
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className={styles.Input}
          />
          <Text type="danger">{formik.errors.email}</Text>
        </Col>
        <Col xs={12} sm={13}>
          <span className={styles.EmailInfo}>
            Убедитесь, что у вас есть доступ к этой почте.
            <br />
            На нее отправим подтверждение, что организация подключена.
          </span>
        </Col>
      </Row>

      <Row justify="space-between" align="middle" type="flex" className={styles.Buttons}>
        <Col xs={12} sm={12}>
          <span>Срок рассмотрения заявки 5 рабочих дней.</span>
        </Col>
        <Col>
          <Link to="/">
            <Button>Отмена</Button>
          </Link>
          <Button type="primary" htmlType="submit">
            Продолжить
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default PowerOfAttorney;
