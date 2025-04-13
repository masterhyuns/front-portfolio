// 현재 폼 진행 상태를 나타내는 단계 타입 (1~3단계)
export type Step = 1 | 2 | 3;

// 전체 폼 데이터 구조
export interface FormWizardData {
  name: string; // 이름
  email: string; // 이메일
  job: string; // 직무 선택
  skills: string[]; // 기술 스택
  introduction: string; // 자기소개
}

// Zustand 스토어의 상태 정의
export interface FormWizardState {
  step: Step; // 현재 단계
  data: FormWizardData; // 입력된 전체 데이터
  goNext: () => void; // 다음 단계로 이동
  goPrev: () => void; // 이전 단계로 이동
  update: (payload: Partial<FormWizardData>) => void; // 입력 데이터 갱신
  reset: () => void; // 전체 초기화
}
