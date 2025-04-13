import { ButtonHTMLAttributes } from 'react';

/**
 * 재사용 가능한 Button 컴포넌트의 props 정의입니다.
 * - `variant`는 버튼의 색상과 스타일을 설정합니다.
 * - `size`는 버튼의 크기(패딩 및 폰트 크기)를 조절합니다.
 * - HTML 기본 <button> 속성들도 함께 사용할 수 있습니다 (ButtonHTMLAttributes 상속).
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}
