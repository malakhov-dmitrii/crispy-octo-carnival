import React from 'react';
import styles from './ModalBody.module.scss';
import { Input, Checkbox, Select } from 'antd';
import { Car, Truck, Bus } from '../../../../shared/Icons/NavSvg';
import FormRowItem from '../../../../shared/components/FormRowItem';
import { TransportsReservation } from '../../../../store/Transport/transports.reducer';

interface ModalBody {
  isVehicle: TransportsReservation;
  setVehicle: { (obj: any): void };
}

interface Handler {
  name: string;
  value: any;
}

const { Option } = Select;

const Wrap: React.FunctionComponent = ({ children }) => <div className={styles.Wrap}>{children}</div>;

const ModalBody = ({ isVehicle, setVehicle }: ModalBody) => {
  const fill = styles.green;
  const sizeIcon = 31;
  const options = [
    {
      id: 0,
      value: 'car',
      name: 'Автомобиль',
      icon: <Car size={sizeIcon} fill={fill} />,
    },
    {
      id: 2,
      value: 'truck',
      name: 'Грузовой автомобиль',
      icon: <Truck size={sizeIcon} fill={fill} />,
    },
    {
      id: 3,
      value: 'bus',
      name: 'Автобус',
      icon: <Bus size={sizeIcon} fill={fill} />,
    },
  ];
  const handler = ({ name, value }: Handler) => {
    setVehicle({
      ...isVehicle,
      [name]: value,
    });
  };

  return (
    <div className={styles.Body}>
      <Wrap>
        <Input
          placeholder="Введите номер"
          value={isVehicle.vrp || ''}
          onChange={e => handler({ name: 'vrp', value: e.target.value })}
        />
      </Wrap>
      <Wrap>
        <Checkbox
          value={isVehicle.vrpFormat || false}
          onChange={e => handler({ name: 'vrpFormat', value: e.target.checked })}
        >
          Прочий (иностранный) номер ТС
        </Checkbox>
      </Wrap>
      <Wrap>
        <FormRowItem label="Тип ТС" marginBottom={0}>
          <Select
            defaultValue="car"
            className={styles.Select}
            style={{ width: '100%' }}
            value={isVehicle.vehicleType || ''}
            onChange={(value: any) => handler({ name: 'vehicleType', value })}
          >
            {options.map(({ id, value, name, icon }) => (
              <Option key={id} value={value} style={{ display: 'flex', alignItems: 'center' }}>
                {icon}
                <span style={{ marginLeft: '14px' }}>{name}</span>
              </Option>
            ))}
          </Select>
        </FormRowItem>
      </Wrap>
      <Wrap>
        <FormRowItem label="Описание (не обязательно)" marginBottom={0}>
          <Input
            placeholder="Введите описание"
            value={isVehicle.description || ''}
            onChange={e => handler({ name: 'description', value: e.target.value })}
          />
        </FormRowItem>
      </Wrap>
      <Wrap>
        <FormRowItem label="Серия и номер СТС (не обязательно)" marginBottom={0}>
          <Input
            placeholder="00 АА 000000"
            value={isVehicle.sts || ''}
            onChange={e => handler({ name: 'sts', value: e.target.value })}
          />
        </FormRowItem>
        <span className={styles.Span}>
          Указав СТС, вы сможете узнавать о штрафах, выписанных на это транспортное средство.
        </span>
      </Wrap>
    </div>
  );
};

export default ModalBody;
