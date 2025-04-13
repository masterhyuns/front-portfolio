import { useFormWizardStore } from '@portfolio/shared';
import { Step1, Step2, Step3, WizardLayout } from '@portfolio/ui';

const FormWizardPage = () => {
  const { step } = useFormWizardStore();

  return (
    <div>
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
    </div>
  );
};
export default FormWizardPage;
