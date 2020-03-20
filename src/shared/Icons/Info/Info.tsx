import React, { FC } from 'react';
import { IconProps } from '../../interfaces/Icons';

const Info: FC<IconProps> = props => {
  const size = props.size || '24';
  const fill = props.fill || 'black';

  return (
    <svg
      className={props.className}
      width={size}
      height={size}
      fill={fill}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 6.10547C11.5341 6.10547 11.1563 5.72771 11.1563 5.26172C11.1563 4.79573 11.5341 4.41797 12 4.41797C12.466 4.41797 12.8438 4.79573 12.8438 5.26172C12.8438 5.72771 12.466 6.10547 12 6.10547ZM12.8438 17.8969H14.8407C15.3071 17.8969 15.6844 18.2742 15.6844 18.7406C15.6844 19.207 15.3071 19.5844 14.8407 19.5844H12.8438H11.1563H9.15942C8.69302 19.5844 8.31567 19.207 8.31567 18.7406C8.31567 18.2742 8.69302 17.8969 9.15942 17.8969H11.1563V9.26953H9.75005C9.28364 9.26953 8.9063 8.89219 8.9063 8.42578C8.9063 7.95937 9.28364 7.58203 9.75005 7.58203H11.1563H12C12.4665 7.58203 12.8438 7.95937 12.8438 8.42578V17.8969Z"
        fill={fill}
      />
    </svg>
  );
};

export default Info;
