import { FC } from 'react';
import { InputField } from '../input-field/input-field';
import { clsx } from 'clsx';
import * as styles from './form-field-renderer.css';
import { UseFormRegister } from 'react-hook-form';
import { FormFieldRendererProps } from './types';

const FormFieldRendererComponent: FC<FormFieldRendererProps> = ({
  meta,
  register,
  error,
}) => {
  const { name, label, type, options, placeholder } = meta;

  switch (type) {
    case 'text':
      return (
        <InputField
          label={label}
          {...register(name)}
          error={error}
          placeholder={placeholder}
        />
      );
    case 'textarea':
      return (
        <div className={styles.field}>
          <label className={styles.label}>{label}</label>
          <textarea
            className={styles.textarea}
            {...register(name)}
            placeholder={placeholder}
          />
          {error && <p className={styles.error}>{error}</p>}
        </div>
      );
    case 'select':
      return (
        <div className={styles.field}>
          <label className={styles.label}>{label}</label>
          <select className={styles.select} {...register(name)}>
            <option value="">선택하세요</option>
            {options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      );
    default:
      return null;
  }
};

export const FormFieldRenderer = FormFieldRendererComponent;
