import { UseFormRegister } from 'react-hook-form';

// libs/shared/src/types/form-meta.ts
export type FieldType = 'text' | 'textarea' | 'select' | 'checkbox';

export interface FormFieldMeta {
  name: string; // 필드명 (key)
  label: string; // 화면에 표시될 라벨
  type: FieldType; // 필드 타입
  required?: boolean; // 필수 여부
  options?: string[]; // select, checkbox 등 옵션 항목
  placeholder?: string; // 입력 placeholder
}

export interface FormFieldRendererProps {
  meta: FormFieldMeta;
  register: UseFormRegister<any>;
  error?: string;
}

export interface MetaEditorProps {
  defaultMeta?: FormFieldMeta[];
  onApply: (meta: FormFieldMeta[]) => void;
}
