import { FC } from 'react';
import { ButtonProps } from './types';
import clsx from 'clsx';
import * as styles from './button.css';

/**
 * 버튼 UI를 구성하는 핵심 컴포넌트입니다.
 * - variant 및 size에 따라 스타일이 변경됩니다.
 * - className을 추가로 덧붙일 수 있습니다.
 */
const ButtonComponent: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(styles.button({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export const Button = ButtonComponent;
