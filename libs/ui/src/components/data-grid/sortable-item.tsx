import React, { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Column } from '@tanstack/react-table';
import * as styles from './sortable-item.css';
import { SortableItemProps } from './types';

const SortableItemComponent: FC<SortableItemProps> = ({ column }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.item}>
      <div className={styles.dragHandle} {...listeners} {...attributes}>
        ::
      </div>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={column.getIsVisible()}
          onChange={column.getToggleVisibilityHandler()}
        />
        {column.columnDef.header as string}
      </label>
    </div>
  );
};

export const SortableItem = SortableItemComponent;
