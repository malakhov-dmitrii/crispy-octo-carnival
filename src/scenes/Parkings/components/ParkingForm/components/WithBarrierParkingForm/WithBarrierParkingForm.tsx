import React, { FC } from 'react';
import styles from './WithBarrierParkingForm.module.scss';
import Text from 'antd/lib/typography/Text';
import { Input } from 'antd';
import { useSelector } from 'react-redux';
import Button from '../../../../../../shared/components/AntOverrides/Button';
import { useFormik } from 'formik';
import { Store } from '../../../../../../store';
import FormRowItem from '../../../../../../shared/components/FormRowItem';
import {
  withBarrierParkingInitialValues,
  withBarrierParkingValidationSchema,
} from '../../../../../../shared/utils/ParkingForm/helpers';

const WithBarrierParkingForm: FC = () => {
  const { isLoading } = useSelector((state: Store) => state.parkings);
  // const cost = useSelector((state: Store) => state.parkings.data.cost);

  const handlerSubmit = () => {
    // console.log('values', values);
  };

  const formik = useFormik({
    initialValues: withBarrierParkingInitialValues,
    validationSchema: withBarrierParkingValidationSchema,
    onSubmit: handlerSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.FormRow}>
        <FormRowItem label="Номер билета" error={formik.errors.ticket}>
          <Input
            name="ticket"
            defaultValue={formik.values.ticket}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormRowItem>
      </div>

      <div className={styles.ConfirmRow}>
        <div>
          <Text>Введите номер билета, чтобы узнать стоимость парковки</Text>
        </div>

        <div className={styles.ButtonBlock}>
          {/*<Text className={styles.Sum}>{cost ? `${(cost.sum / 100).toFixed(2)} ₽` : ''}</Text>*/}
          <Button className={styles.ConfirmButton} type={isLoading ? 'dashed' : 'primary'} htmlType="submit">
            Узнать цену
          </Button>
        </div>
      </div>
    </form>
  );
};

export default WithBarrierParkingForm;
