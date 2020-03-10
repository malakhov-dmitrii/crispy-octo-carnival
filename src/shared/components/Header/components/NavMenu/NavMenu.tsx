import React, { useState, useEffect } from 'react';
import styles from './NavMenu.module.scss';
import { Select, Menu } from 'antd';
import { Business, Exit } from '../../../../Icons/NavSvg';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from '../../../../../store';
import { LegalEntitiesActions } from '../../../../../store/LegalEntities/legalEntities.actions';
import { Link } from 'react-router-dom';
import { useLocalAuth } from '../../../../utils';

const { SubMenu, Item } = Menu;
const { Option } = Select;

const NavMenu = () => {
  const activeOrganizationExternalId = useSelector((state: Store) => state.config.activeOrganizationExternalId);
  const legalEntities = useSelector((state: Store) => state.legalEntities.items);
  const dispatch = useDispatch();

  const [currentOrg, setCurrentOrg]: any = useState(null);
  const localAuth = useLocalAuth();

  useEffect(() => {
    if (activeOrganizationExternalId) {
      // Получить список доступных организаций, если нет
      if (!legalEntities.length && localAuth) {
        dispatch({ type: LegalEntitiesActions.GetLegalEntities });
      }

      if (legalEntities.length) {
        // Выбрать текущую организацию, если список есть
        const currentOrg = legalEntities.find(org => String(org.externalId) === activeOrganizationExternalId);
        if (currentOrg?.legalEntityInfo) setCurrentOrg(currentOrg.legalEntityInfo);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, activeOrganizationExternalId, legalEntities]);

  const legalEntitiesNodes = legalEntities
    .filter(i => String(i.externalId) !== String(activeOrganizationExternalId))
    .map((i, index) => (
      <Item key={index}>
        <Link to={`/organization/${i.externalId}/parkings`}>{i.legalEntityInfo.shortName}</Link>
      </Item>
    ));

  return (
    <div>
      {currentOrg ? (
        <div className={styles.OrgInfo}>
          <Menu mode="horizontal" selectedKeys={[]}>
            <SubMenu
              title={
                <div className={styles.OrgInfo}>
                  <Business size={24} />
                  <div className={styles.OrgTitle}>{currentOrg.shortName}</div>
                </div>
              }
            >
              <Menu.ItemGroup title={currentOrg.fullName}>
                <Menu.Item key="setting:1" className={styles.MenuItem}>
                  <Link to={`/organization/${activeOrganizationExternalId}/profile`}>
                    <div className={styles.OrgInfo}>
                      <Business />
                      <div className={styles.OrgTitle}>Профиль организации</div>
                    </div>
                  </Link>
                </Menu.Item>
                <Menu.Item key="setting:3" className={styles.MenuItem}>
                  <Link to={`/logout`}>
                    <div className={styles.OrgInfo}>
                      <Exit />
                      <div className={styles.OrgTitle}>Выйти</div>
                    </div>
                  </Link>
                </Menu.Item>
                <Menu.Divider />

                {legalEntitiesNodes}

                <Menu.Divider />
                <Menu.Item key="setting:4" className={styles.MenuFooter}>
                  <div className={styles.AddOrg}>
                    <div className={styles.Missing}>Нужной организации нет в списке?</div>
                    <div className={styles.AddFromGos}>Добавить на портале Госуслуг</div>
                  </div>
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>

          <Select defaultValue="ru" size="small" style={{ width: 99 }}>
            <Option value="ru">Русский</Option>
          </Select>
        </div>
      ) : (
        <Link to="/">Войти</Link>
      )}
    </div>
  );
};

export default NavMenu;
