import React, { FC } from 'react';
import styles from './Tag.module.scss';
import cn from 'classnames';
import { Tag as TagAntd } from 'antd';

const Tag: FC = ({ children }) => {
  return <TagAntd className={cn(styles.Tag)}>{children}</TagAntd>;
};

export default Tag;
