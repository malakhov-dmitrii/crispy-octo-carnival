// @ts-nocheck

import React, { useEffect, useState, FC } from 'react';
import styles from './Profile.module.scss';
import cn from 'classnames';
import { Card, Input, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useDispatch, useSelector } from 'react-redux';
import { OrgProfileActions } from '../../store/OrgProfile/OrgProfile.actions';
import { Store } from '../../store';
import TextArea from 'antd/lib/input/TextArea';
import Button from '../../shared/components/AntOverrides/Button';
import { OrgItem } from '../../store/OrgProfile/OrgProfile.reducer';
import { LegalEntitiesActions } from '../../store/LegalEntities/legalEntities.actions';
import _ from 'lodash';

/**
 * Создает новый экземпляр обекта без Null,
 * пустых обьектов, пустых массивов и Пустых строк,
 * используя принцыпы чистых функций,
 * использует рекурсию
 * (оставляет явные undefined, false и 0)
 *
 * @prop {obj} {any}  является обектом который необходимо очистить от пустых переменных
 *
 * @returns {any} новый обьект
 */
const deepCleanObj = (obj: any): any => {
  const newObj: any = {};

  Object.keys(obj).forEach(key => {
    const value = obj[key];
    const type = Object.prototype.toString.call(value);

    if (type === '[object Object]') newObj[key] = deepCleanObj(value);
    else if (value !== null && value !== '' && !(type === '[object Array]' && !value.length)) newObj[key] = value;

    // удаляем пустые обьекты
    if (type === '[object Object]' && !Object.keys(newObj[key]).length) delete newObj[key];
  });

  return newObj;
};

/**
 * добавляет в обект новую переменную
 * используя принцыпы чистых функций
 * используется рекурсия
 *
 * @prop {obj} {any} обьект в который добавляем новую переменную
 * @prop {path} string путь по которому добавляем новую переменную
 * @prop {value} any значение переменной которую мы добавляем
 *
 * @returns {any} новый обьект
 */
const deepAddValue = ({ obj, path, value }: { obj: any; path: string; value: any }): any => {
  const loop = ({ obj, keys, value }: { obj: any; keys: string[]; value: any }) => {
    let newObj: any = {};

    const key = keys.shift() || '';

    newObj = {
      ...obj,
      [key]: keys.length ? loop({ obj: obj[key], keys, value }) : value,
    };

    return newObj;
  };

  return loop({ obj, keys: path.split('.'), value });
};

/**
 * удаляет из обьекта ключи
 * используя принцыпы чистых функций
 * используется рекурсия
 * @prop {obj} {any} обект из которого необходимо удалить кулючи
 * @prop {list} string[] список путей которые необходимо удалить
 *
 * @returns {any} новый обьект
 */
const deepDeleteKeys = ({ obj, list }: { obj: any; list: string[] }) => {
  const newObj: any = _.cloneDeep(obj);

  const loop = ({ obj, keys }: { obj: any; keys: string[] }) => {
    const key = keys.shift() || '';

    if (keys.length) loop({ obj: obj[key], keys });
    else delete obj[key];
  };

  for (const path of list) loop({ obj: newObj, keys: path.split('.') });

  return newObj;
};

const Profile: FC = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((state: Store) => state.orgProfile);

  const [orgForm, setOrgForm]: [OrgItem, any] = useState({});

  useEffect(() => {
    dispatch({ type: OrgProfileActions.GetOrgProfile });
  }, [dispatch]);

  useEffect(() => {
    data && setOrgForm({ ...orgForm, ...data });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const submit = () => {
    let data: any = deepCleanObj(orgForm?.legalEntityInfo);

    data = deepDeleteKeys({
      obj: data,
      list: ['ogrnip', 'kpp', 'inn', 'shortName', 'fullName', 'type', 'ogrnip'],
    });

    dispatch({
      type: LegalEntitiesActions.UpdateLegalEntities,
      payload: data,
    });
  };

  const handleChange = (e: any, path: string) => {
    setOrgForm(
      deepAddValue({
        path,
        obj: orgForm,
        value: e.target.value,
      }),
    );
  };

  return (
    <Card className={cn(styles.Card)}>
      <div className={styles.CardBody}>
        <Title>Профиль организации</Title>

        <div className={styles.InputsRow}>
          <div className={styles.FirstRowInputItem}>
            <label>ИНН</label>
            <Input value={orgForm?.legalEntityInfo?.inn} disabled={true} />
          </div>

          <div className={styles.FirstRowInputItem}>
            <label>КПП</label>
            <Input value={orgForm?.legalEntityInfo?.kpp} disabled={true} />
          </div>

          <div className={styles.FirstRowInputItem}>
            <label>ОГРН</label>
            <Input value={orgForm?.legalEntityInfo?.ogrnip} disabled={true} />
          </div>
        </div>

        <div className={styles.InputsRow}>
          <div className={styles.LargeInput}>
            <label>Юридический адрес</label>
            <Input value={orgForm?.legalEntityInfo?.addresses.legalAddress} disabled={true} />
          </div>
        </div>

        <div className={styles.InputsRow}>
          <div className={styles.LargeInput}>
            <label>Почтовый адрес</label>
            <Input
              value={orgForm?.legalEntityInfo?.addresses.actualAddress}
              onChange={e => handleChange(e, 'legalEntityInfo.addresses.actualAddress')}
            />
          </div>
        </div>

        <div className={styles.InputsRow}>
          <div className={styles.LargeInput}>
            <label>Email</label>
            <Input
              type="email"
              value={orgForm.legalEntityInfo?.contacts.email}
              placeholder="Введите адрес"
              onChange={e => handleChange(e, 'legalEntityInfo.contacts.email')}
            />
            <label>для отчетов, счетов и уведомлений </label>
          </div>
        </div>

        <div className={styles.InputsRow}>
          <div className={styles.LargeInput}>
            <label>Контактный телефон</label>
            <Input
              type="tel"
              value={orgForm.legalEntityInfo?.contacts.phone}
              placeholder="Введите номер телефона"
              onChange={e => handleChange(e, 'legalEntityInfo.contacts.phone')}
            />
          </div>
        </div>

        <div className={styles.InputsRow}>
          <div className={styles.LargeInput}>
            <label>Примечания</label>
            <TextArea
              value={orgForm.legalEntityInfo?.notes}
              placeholder="ФИО контактного лица, часы работы"
              onChange={e => handleChange(e, 'legalEntityInfo.notes')}
            />
          </div>
        </div>

        <Typography className={styles.SectionTitle}>Руководитель</Typography>

        <div className={styles.InputsRow}>
          <div className={styles.LargeInput}>
            <label>ФИО</label>
            <Input
              value={`${data?.legalEntityInfo?.chief?.firstName || ''} ${orgForm?.legalEntityInfo?.chief?.middleName ||
                ''} ${data?.legalEntityInfo?.chief?.lastName || ''}`}
              disabled={true}
            />
          </div>
        </div>

        <div className={styles.InputsRow}>
          <div className={styles.LargeInput}>
            <label>Должность</label>
            <Input value={orgForm?.legalEntityInfo?.chief.post} disabled={true} />
          </div>
        </div>

        <Typography className={styles.SectionTitle}>Платежные реквизиты</Typography>

        <div className={styles.InputsRow}>
          <div className={styles.LargeInput}>
            <label>Рассчетный счет</label>
            <Input
              value={orgForm?.legalEntityInfo?.paymentDetails?.account}
              onChange={e => handleChange(e, 'legalEntityInfo.paymentDetails.account')}
            />
          </div>
        </div>

        <div className={styles.InputsRow}>
          <div className={styles.LargeInput}>
            <label>БИК</label>
            <Input
              value={orgForm?.legalEntityInfo?.paymentDetails?.bIC}
              onChange={e => handleChange(e, 'legalEntityInfo.paymentDetails.bic')}
            />
          </div>
        </div>

        <div className={styles.InputsRow}>
          <div className={styles.LargeInput}>
            <label>Наименование банка</label>
            <Input
              value={orgForm?.legalEntityInfo?.paymentDetails?.bankName}
              onChange={e => handleChange(e, 'legalEntityInfo.paymentDetails.bankName')}
            />
          </div>
        </div>

        <div className={styles.InputsRow}>
          <div className={styles.LargeInput}>
            <label>Корр.счет</label>
            <Input
              value={orgForm?.legalEntityInfo?.paymentDetails?.korAccount}
              onChange={e => handleChange(e, 'legalEntityInfo.paymentDetails.korAccount')}
            />
          </div>
        </div>

        <div className={styles.ActionsRow}>
          {/* <Button>Отмена</Button> */}
          <div className={styles.Gap} />
          <Button type="primary" onClick={() => submit()}>
            Сохранить
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Profile;
