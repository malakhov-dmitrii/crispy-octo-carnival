import React from 'react';
import { Menu, Dropdown } from 'antd';
import { More, Edit, Delete } from '../../../../shared/Icons/NavSvg';
import styles from './MoreMenu.module.scss';
import { TransportsReservation } from '../../../../store/Transport/transports.reducer';

interface MenuMore {
  //** Ключ для маски SVG */
  vehicle: TransportsReservation;
  setOptionsModal: { (obj: any): void };
  setIsModalVisible: { (obj: any): void };
  setVehicle: { (obj: any): void };
}

const MoreMenu = ({ vehicle, setOptionsModal, setIsModalVisible, setVehicle }: MenuMore) => {
  const menu = (
    <Menu>
      <Menu.Item
        key="0"
        className={styles.Item}
        onClick={() => {
          setOptionsModal({
            title: 'Редактировать транспорт',
            okText: 'Применить',
          });
          setIsModalVisible(true);
          setVehicle(vehicle);
        }}
      >
        <Edit size={14} className={styles.Icon} mask={vehicle.id} /> Править
      </Menu.Item>
      <Menu.Item key="1" className={styles.Item}>
        <Delete size={14} className={styles.Icon} mask={vehicle.id} /> Удалить
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link" href="#top">
        <More size={16} />
      </a>
    </Dropdown>
  );
};

export default MoreMenu;
