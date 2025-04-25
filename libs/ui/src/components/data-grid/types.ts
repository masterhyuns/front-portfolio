import { Column } from '@tanstack/react-table';

export interface ColumnSettingsProps {
  columns: Column<any>[];
  onChangeOrder: (orderedIds: string[]) => void;
}

export interface SortableItemProps {
  column: Column<any>;
}
