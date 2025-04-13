// libs/ui/src/components/form-wizard/step2.tsx
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useFormWizardStore } from '@portfolio/shared';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { WizardLayout } from '../wizard-layout/wizard-layout';
import * as styles from './step2.css';
import clsx from 'clsx';

const schema = z.object({
  job: z.string().min(1, '직무를 선택해주세요'),
  skills: z.array(z.string()).min(1, '기술 스택을 1개 이상 선택해주세요'),
});

const jobOptions = ['Frontend', 'Backend', 'Fullstack', 'DevOps'];
const skillOptions = [
  'React',
  'Vue',
  'TypeScript',
  'Node.js',
  'GraphQL',
  'Docker',
];

const Step2Component: FC = () => {
  const { data, update } = useFormWizardStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      job: data.job,
      skills: data.skills,
    },
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const selectedSkills = watch('skills');

  const toggleSkill = (skill: string) => {
    const next = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setValue('skills', next, { shouldValidate: true });
  };

  const onNext = (values: any) => {
    update(values);
  };

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <WizardLayout
        title="직무 및 기술 선택"
        onNext={handleSubmit(onNext)}
        isNextDisabled={!isValid}
      >
        <div className={styles.group}>
          <label className={styles.label}>직무 선택</label>
          <select {...register('job')} className={styles.select}>
            <option value="">선택하세요</option>
            {jobOptions.map((job) => (
              <option key={job} value={job}>
                {job}
              </option>
            ))}
          </select>
          {errors.job && <p className={styles.error}>{errors.job.message}</p>}
        </div>

        <div className={styles.group}>
          <label className={styles.label}>기술 스택 선택 (복수 선택)</label>
          <div className={styles.skillList}>
            {skillOptions.map((skill) => (
              <button
                type="button"
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={clsx(
                  styles.skillButton,
                  selectedSkills.includes(skill)
                    ? styles.skillActive
                    : styles.skillInactive
                )}
              >
                {skill}
              </button>
            ))}
          </div>
          {errors.skills && (
            <p className={styles.error}>{errors.skills.message}</p>
          )}
        </div>
      </WizardLayout>
    </form>
  );
};

export const Step2 = Step2Component;
