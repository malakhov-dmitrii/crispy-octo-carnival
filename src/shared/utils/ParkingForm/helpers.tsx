import * as yup from 'yup';
import { ParkingState } from '../../../store/Parkings/parkings.reducer';
import { Config, VrpRegexpsOptions, VrpRegexpsLocal } from '../../../store/Config/config.reducer';
import { Car, Truck, Bus } from '../../Icons/NavSvg';

export const icons: any = {
  car: Car,
  bus: Bus,
  truck: Truck,
};

export const vehicleTypes = ['car', 'bus', 'truck'];

export const durations = [
  { label: '00 ч 30 мин', value: '30' },
  { label: '01 ч 00 мин', value: '60' },
  { label: '01 ч 30 мин', value: '90' },
  { label: '02 ч 00 мин', value: '120' },
  { label: '02 ч 30 мин', value: '150' },
  { label: '03 ч 00 мин', value: '180' },
  { label: '03 ч 30 мин', value: '210' },
  { label: '04 ч 00 мин', value: '240' },
  { label: '04 ч 30 мин', value: '270' },
  { label: '05 ч 00 мин', value: '300' },
];

export const initialValues: ParkingState = {
  vrp: '',
  zoneNumber: '',
  duration: '',
  vehicleType: 'car',
  vrpFormat: 'local',
};

interface ValidationSchemaOptions {
  vrpIsLocal: boolean;
  vehicleType: keyof VrpRegexpsLocal;
  config: Config;
}

export const getValidationSchema = ({ vrpIsLocal, vehicleType, config }: ValidationSchemaOptions) => {
  const vrpRegexps: VrpRegexpsOptions = vrpIsLocal ? config.vrpRegexps.foreign : config.vrpRegexps.local[vehicleType];
  const regex = new RegExp(vrpRegexps.pattern, vrpRegexps.flags);

  return yup.object().shape({
    vrp: yup
      .string()
      .max(20, 'Максимальная длина 20 символов')
      .matches(regex, 'Введите корректный номер машины')
      .required('Введите номер машины'),
    zoneNumber: yup.number().required('Выберите зону'),
    duration: yup.string().required('Выберите время на парковке'),
    vehicleType: yup.string().required(),
    vrpFormat: yup.string().required(),
  });
};
