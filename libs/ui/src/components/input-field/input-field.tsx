import { FC } from 'react';
import * as styles from './input-field.css';
import { clsx } from 'clsx';
import { InputFieldProps } from './types';

const InputFieldComponent: FC<InputFieldProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <input className={clsx(styles.input, className)} {...props} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export const InputField = InputFieldComponent;
