import { style } from '@vanilla-extract/css';
import { vars } from '@portfolio/theme';

// 전체 layout: 왼쪽 데이터 그리드, 오른쪽 세팅 영역
export const container = style({
  display: 'flex',
  width: '100%',
  height: '400px',
});

// 데이터 그리드 (좌측)
export const dataGridArea = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

// 헤더
export const headerWrapper = style({
  position: 'sticky',
  top: 0,
  zIndex: 10,
  backgroundColor: vars.color.white,
  overflow: 'hidden',
});

export const headerInner = style({
  display: 'flex',
  transition: 'transform 0.05s ease-out',
});

// 바디
export const bodyWrapper = style({
  flex: 1,
  overflowX: 'auto',
  overflowY: 'auto',
  height: '100%',
});

export const bodyInner = style({
  position: 'relative',
});

export const row = style({
  display: 'flex',
  position: 'absolute',
  top: 0,
  left: 0,
  height: '48px',
  borderBottom: `1px solid ${vars.color.gray200}`,
  backgroundColor: vars.color.white,
  boxSizing: 'border-box',
});

export const cell = style({
  flex: '0 0 auto',
  padding: `${vars.space[2]} ${vars.space[3]}`,
  fontSize: vars.fontSize.base,
  color: vars.color.gray900,
  borderRight: `1px solid ${vars.color.gray300}`,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

// 오른쪽 설정 패널 전체 wrapper
export const settingPanelContainer = style({
  position: 'relative',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'flex-end',
  backgroundColor: vars.color.gray100,
});
export const settingBar = style({
  width: '32px',
  padding: '5px 2px',
  display: 'flex',
  alignItems: 'flex-start',
});
// 고정된 32px 토글 버튼
export const settingToggleButton = style({
  border: 'none',
  backgroundColor: vars.color.gray200,
  cursor: 'pointer',
  zIndex: 1,
  writingMode: 'vertical-lr',
  width: '100%',
  padding: '20px 0',
});

// 클릭 시 나타나는 패널 (왼쪽 방향)
export const settingPanel = style({
  width: '250px',
  height: '100%',
  backgroundColor: vars.color.white,
  borderLeft: `1px solid ${vars.color.gray300}`,
  boxShadow: '-4px 0 8px rgba(0,0,0,0.05)',
  zIndex: 2,
  overflowY: 'scroll',
});

export const resizer = style({
  position: 'absolute',
  right: 0,
  top: 0,
  height: '100%',
  width: '4px',
  cursor: 'col-resize',
  userSelect: 'none',
  touchAction: 'none',
  zIndex: 10,
});
export const headerCellWrapper = style({
  position: 'relative',
});

export const stickyLeft = style({
  position: 'sticky',
  left: 0,
  zIndex: 3,
  backgroundColor: vars.color.white, // 스크롤시 배경 비침 방지
  boxShadow: `2px 0 2px -1px ${vars.color.gray200}`, // 좌측 경계 강조
});

export const hoveredRow = style({
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.gray100,
    },
  },
});

export const selectedRow = style({
  backgroundColor: vars.color.gray200,
});
