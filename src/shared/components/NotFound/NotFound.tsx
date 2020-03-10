import React from 'react';
import styles from './NotFound.module.scss';
import Button from '../AntOverrides/Button';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import Title from 'antd/lib/typography/Title';

const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <Card className={styles.Card}>
        <Title level={2}>Whhops! This page does not exist.</Title>

        <Link to="/">
          <Button size="large" type="primary">
            На главную
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default NotFound;
