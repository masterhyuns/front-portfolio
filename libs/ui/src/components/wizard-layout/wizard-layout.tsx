import { FC } from 'react';
import { WizardLayoutProps } from './types';
import { Button } from '../button/button';
import { useFormWizardStore } from '@portfolio/shared';
import * as styles from './wizard-layout.css';
const WizardLayoutComponent: FC<WizardLayoutProps> = ({
  title,
  children,
  onNext,
  onSubmit,
  isNextDisabled,
  isSubmit,
}) => {
  const { step, goPrev, goNext } = useFormWizardStore();

  const handleNext = () => {
    onNext?.();
    goNext();
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <div>{children}</div>

      <div className={styles.footer}>
        {step > 1 ? <Button onClick={goPrev}>이전</Button> : <span />}
        {isSubmit ? (
          <Button
            variant="primary"
            onClick={onSubmit}
            disabled={isNextDisabled}
          >
            제출
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={isNextDisabled}
          >
            다음
          </Button>
        )}
      </div>
    </div>
  );
};

export const WizardLayout = WizardLayoutComponent;
