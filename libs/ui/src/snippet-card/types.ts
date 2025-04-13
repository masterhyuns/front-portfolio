import { ReactNode } from 'react';

/**
 * SnippetCard 컴포넌트에 전달되는 props 정의입니다.
 * - `title`: 카드 상단에 표시할 제목입니다.
 * - `description`: 선택 사항으로, 카드에 대한 부가 설명입니다.
 * - `codeSnippet`: 미리보기용 코드 문자열입니다.
 * - `children`: 카드 내부에 렌더링될 실제 컴포넌트입니다.
 */
export interface SnippetCardProps {
  title: string;
  description?: string;
  codeSnippet: string;
  children: ReactNode;
}
