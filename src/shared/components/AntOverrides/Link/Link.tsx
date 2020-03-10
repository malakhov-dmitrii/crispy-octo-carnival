import React from 'react';
import styles from './Link.module.scss';
import cn from 'classnames';
import { Link as AntLink, LinkProps } from 'react-router-dom';

const Link = (props: LinkProps) => {
  return <AntLink {...props} className={cn(props.className, styles.Link)} />;
};

export default Link;
