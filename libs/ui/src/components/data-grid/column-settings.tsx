import React, { FC } from 'react';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { useReactTable, Column } from '@tanstack/react-table';
import { SortableItem } from './sortable-item';
import { ColumnSettingsProps } from './types';

const ColumnSettingsComponent: FC<ColumnSettingsProps> = ({
  columns,
  onChangeOrder,
}) => {
  const [items, setItems] = React.useState(() => columns.map((col) => col.id));

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      onChangeOrder(newItems);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((columnId) => {
          const column = columns.find((c) => c.id === columnId);
          if (!column) return null;
          return <SortableItem key={column.id} column={column} />;
        })}
      </SortableContext>
    </DndContext>
  );
};

export const ColumnSettings = ColumnSettingsComponent;
