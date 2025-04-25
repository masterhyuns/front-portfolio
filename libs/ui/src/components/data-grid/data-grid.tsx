import {
  ColumnDef,
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as styles from './data-grid.css'; // @vanilla-extract/css 스타일 파일
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { AnimatePresence, motion } from 'framer-motion';
import { ColumnSettings } from './column-settings';
import clsx from 'clsx';
import { headerCellWrapper } from './data-grid.css';

type DataGridProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T, any>[];
};

const DataGridComponent = <T extends object>({
  data,
  columns,
}: DataGridProps<T>) => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]); //;
  const toggleSettingPanel = () => setIsSettingOpen((prev) => !prev);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnOrder,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onColumnOrderChange: setColumnOrder,
    columnResizeMode: 'onChange',
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  const rows = table.getRowModel().rows;
  // Get columns in the same order as the header
  const orderedColumns = table
    .getHeaderGroups()[0]
    .headers.map((h) => h.column);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => bodyRef.current,
    estimateSize: () => 48,
    overscan: 5,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalHeight = rowVirtualizer.getTotalSize();
  const totalWidth = orderedColumns.reduce(
    (sum, col) => sum + col.getSize(),
    0
  );

  useLayoutEffect(() => {
    const scrollElement = bodyRef.current;
    if (!scrollElement) return;
    scrollElement.scrollLeft = 0;
    setScrollLeft(0);
  }, []);

  useEffect(() => {
    const scrollElement = bodyRef.current;
    if (!scrollElement) return;

    const syncScroll = () => setScrollLeft(scrollElement.scrollLeft);
    scrollElement.addEventListener('scroll', syncScroll);

    return () => scrollElement.removeEventListener('scroll', syncScroll);
  }, []);
  {
    /*
    헤더 컬럼에 추가 하면 리사이즈 됨
    {...{
                    onMouseDown: header.getResizeHandler(),
                    onTouchStart: header.getResizeHandler(),
                  }}*/
  }
  return (
    <div className={styles.container}>
      <div className={styles.dataGridArea}>
        <div className={styles.headerWrapper} ref={headerRef}>
          <div style={{ display: 'flex' }}>
            <div
              className={clsx(styles.cell, styles.stickyLeft)}
              style={{
                width: 48,
                fontWeight: 'bold',
                backgroundColor: '#f9f9f9',
              }}
            >
              <input
                type="checkbox"
                checked={table.getIsAllRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
              />
            </div>
            <div
              className={styles.headerInner}
              style={{
                width: totalWidth,
                transform: `translateX(${-scrollLeft}px)`,
              }}
            >
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <div className={styles.headerCellWrapper}>
                    <div
                      key={header.id}
                      className={clsx(styles.cell)}
                      style={{
                        width: header.getSize(),
                        fontWeight: 'bold',
                        backgroundColor: '#f9f9f9',
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
                    <div
                      className={styles.resizer}
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                      }}
                      style={{
                        cursor: header.column.getIsResizing()
                          ? 'col-resize'
                          : 'ew-resize',
                      }}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div ref={bodyRef} className={styles.bodyWrapper}>
          <div
            className={styles.bodyInner}
            style={{ height: totalHeight, width: totalWidth }}
          >
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <div
                  key={row.id}
                  className={clsx(
                    styles.row,
                    styles.hoveredRow,
                    row.getIsSelected() && styles.selectedRow
                  )}
                  style={{ transform: `translateY(${virtualRow.start}px)` }}
                >
                  <div
                    className={clsx(
                      styles.cell,
                      styles.stickyLeft,
                      styles.hoveredRow,
                      row.getIsSelected() && styles.selectedRow
                    )}
                    style={{ width: 48 }}
                  >
                    <input
                      type="checkbox"
                      checked={row.getIsSelected()}
                      onChange={row.getToggleSelectedHandler()}
                    />
                  </div>
                  {orderedColumns.map((column) => {
                    const cell = row
                      .getVisibleCells()
                      .find((c) => c.column.id === column.id);
                    return (
                      <div
                        key={column.id}
                        className={styles.cell}
                        style={{ width: column.getSize() }}
                      >
                        {cell &&
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.settingPanelContainer}>
        <AnimatePresence>
          {isSettingOpen && (
            <motion.div
              className={styles.settingPanel}
              initial={{ x: 250, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 250, opacity: 0 }}
              transition={{ type: 'tween', duration: 0.2 }}
            >
              <ColumnSettings
                columns={table.getAllLeafColumns()}
                onChangeOrder={(ids) => {
                  setColumnOrder(ids);
                  console.log('ids [] => ', ids);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className={styles.settingBar}>
          <button
            className={styles.settingToggleButton}
            onClick={toggleSettingPanel}
          >
            Column
          </button>
        </div>
      </div>
    </div>
  );
};

export const DataGrid = DataGridComponent;
