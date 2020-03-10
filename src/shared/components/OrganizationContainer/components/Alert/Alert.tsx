import React from 'react';
import styles from './Alert.module.scss';
import cn from 'classnames';
import { Row, Col } from 'antd';
import Button from '../../../AntOverrides/Button';
import { useSelector } from 'react-redux';
import { Store } from '../../../../../store';
import { Link, useRouteMatch } from 'react-router-dom';

const Alert = () => {
  const activeOrganizationExternalId = useSelector((state: Store) => state.config.activeOrganizationExternalId);
  const { params } = useRouteMatch();

  const alert = (
    <div className={cn(styles.Alert, styles.Black)}>
      <div className={cn(styles.Content)}>
        <Row className={cn(styles.Flex)}>
          <Col className={cn(styles.GrowRowOne)}>
            <Row>
              <Col>
                <span className={cn(styles.Title)}>Сведения об организации указаны не полностью</span>
              </Col>
              <Col>
                <span className={cn(styles.Description)}>Вы не можете формировать счета на оплату</span>
              </Col>
            </Row>
          </Col>
          <Col>
            <Button>
              <Link to={`/organization/${activeOrganizationExternalId}/profile`}>Указать сведения</Link>
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );

  return activeOrganizationExternalId && params.page !== 'profile' ? alert : null;
};

export default Alert;
