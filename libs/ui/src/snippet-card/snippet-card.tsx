import { FC, useState } from 'react';
import { Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as styles from './snippet-card.css';
import { SnippetCardProps } from './types';

/**
 * 마우스를 올리면 코드 스니펫과 복사 버튼이 표시되는 카드 컴포넌트입니다.
 * - `title`, `description`, `children`을 시각적으로 보여주고
 * - `codeSnippet`을 하단에 떠 있는 코드 블록으로 렌더링합니다.
 * - hover 시 애니메이션이 작동하며 복사 기능도 포함되어 있습니다.
 */
const SnippetCardComponent: FC<SnippetCardProps> = ({
  title,
  description,
  codeSnippet,
  children,
}) => {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  return (
    <div
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.preview}>
        <h4>{title}</h4>
        {description && <p>{description}</p>}
        <div>{children}</div>
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            className={styles.snippet}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <pre className={styles.code}>
              <code>{codeSnippet}</code>
            </pre>
            <button className={styles.copyButton} onClick={handleCopy}>
              {copied ? '✅ Copied' : <Copy size={16} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SnippetCard = SnippetCardComponent;
