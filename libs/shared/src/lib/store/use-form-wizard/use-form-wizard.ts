import { FormWizardData, FormWizardState, Step } from './types';
import { create } from 'zustand';

// 초기값 정의
const initialState: FormWizardData = {
  name: '',
  email: '',
  job: '',
  skills: [],
  introduction: '',
};

// Zustand 상태 생성
export const useFormWizardStore = create<FormWizardState>((set) => ({
  step: 1,
  data: initialState,
  goNext: () =>
    set((s) => ({
      step: s.step < 3 ? ((s.step + 1) as Step) : 3,
    })),
  goPrev: () =>
    set((s) => ({
      step: s.step > 1 ? ((s.step - 1) as Step) : 1,
    })),
  update: (payload) =>
    set((s) => ({
      data: { ...s.data, ...payload },
    })),
  reset: () => set({ step: 1, data: initialState }),
}));
