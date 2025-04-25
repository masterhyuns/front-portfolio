// libs/components/ColumnSettings/column-settings.css.ts
import { vars } from '@portfolio/theme';
import { style } from '@vanilla-extract/css';

export const item = style({
  display: 'flex',
  alignItems: 'center',
  padding: `${vars.space[2]} ${vars.space[3]}`,
  borderBottom: `1px solid ${vars.color.gray200}`,
  backgroundColor: vars.color.white,
  gap: vars.space[2],
});

export const dragHandle = style({
  cursor: 'grab',
  padding: `0 ${vars.space[2]}`,
  fontSize: vars.fontSize.lg,
  color: vars.color.gray600,
  userSelect: 'none',
});

export const label = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[2],
  fontSize: vars.fontSize.base,
  color: vars.color.gray800,
});
