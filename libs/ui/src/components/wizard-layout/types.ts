import { ReactNode } from 'react';

export interface WizardLayoutProps {
  title: string;
  children: ReactNode;
  onNext?: () => void;
  onSubmit?: () => void;
  isNextDisabled?: boolean;
  isSubmit?: boolean;
}
