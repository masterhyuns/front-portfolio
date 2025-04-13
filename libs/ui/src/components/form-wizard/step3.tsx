import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useFormWizardStore } from '@portfolio/shared';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { WizardLayout } from '../wizard-layout/wizard-layout';
import { InputField } from '../input-field/input-field';

const schema = z.object({
  introduction: z.string().min(10, '10자 이상 입력해주세요'),
});

const Step3Component = () => {
  const { data, update, reset } = useFormWizardStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      introduction: data.introduction,
    },
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (values: any) => {
    update(values);
    alert('제출 완료! 콘솔을 확인하세요.');
    console.log('[최종 제출 데이터]', {
      ...data,
      ...values,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <WizardLayout
        title="자기소개"
        onSubmit={handleSubmit(onSubmit)}
        isSubmit
        isNextDisabled={!isValid}
      >
        <InputField
          label="자기소개"
          {...register('introduction')}
          error={errors.introduction?.message}
        />
      </WizardLayout>
    </form>
  );
};

export const Step3 = Step3Component;
