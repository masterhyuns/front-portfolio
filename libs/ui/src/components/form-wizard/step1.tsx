import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useFormWizardStore } from '@portfolio/shared';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { WizardLayout } from '../wizard-layout/wizard-layout';
import { InputField } from '../input-field/input-field';

const schema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
});

const Step1Component: FC = () => {
  const { data, update } = useFormWizardStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: data.name,
      email: data.email,
    },
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onNext = (values: any) => {
    update(values);
  };

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <WizardLayout
        title="기본 정보 입력"
        onNext={handleSubmit(onNext)}
        isNextDisabled={!isValid}
      >
        <InputField
          label="이름"
          {...register('name')}
          error={errors.name?.message}
        />
        <InputField
          label="이메일"
          {...register('email')}
          error={errors.email?.message}
        />
      </WizardLayout>
    </form>
  );
};

export const Step1 = Step1Component;
