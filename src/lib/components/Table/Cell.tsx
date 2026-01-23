import { cn } from '@adam-sv/arc';
import type { ICell, ICellEventParams } from './types';
import type { JSX } from 'react';

export interface ICellProps<T> {
  cellModel: ICell<T>;
}

export const updateRowHeight = <T,>(
  element: HTMLDivElement,
  cellModel: ICell<T>
) => {
  const { rowHeight, setRowHeight } = cellModel;
  const cellHeight = element.clientHeight;
  if (!rowHeight || cellHeight > rowHeight) {
    setRowHeight(cellHeight + 1);
  }
};

const didMouseOverCell = <T,>(params: ICellEventParams<T>) => {
  const { cellModel } = params;
  const { cellHighlight, rowIndex, columnIndex, eventHandlers } = cellModel;
  const { highlightScheme, setHighlightedRowIndex, setHighlightedColumnIndex } =
    cellHighlight;
  if (highlightScheme?.includes('horizontal')) setHighlightedRowIndex(rowIndex);
  if (highlightScheme?.includes('vertical'))
    setHighlightedColumnIndex(columnIndex);
  const { didHoverCell } = eventHandlers;
  if (didHoverCell) didHoverCell(params);
};

const didMouseLeaveCell = <T,>(params: ICellEventParams<T>) => {
  const { cellModel } = params;
  const { cellHighlight, rowIndex, columnIndex, eventHandlers } = cellModel;

  if (
    cellHighlight.highlightedRowIndex === rowIndex &&
    cellHighlight.highlightedColumnIndex === columnIndex
  ) {
    cellHighlight.setHighlightedColumnIndex(undefined);
    cellHighlight.setHighlightedRowIndex(undefined);
  }

  const { didMouseLeaveCell } = eventHandlers;
  if (didMouseLeaveCell) didMouseLeaveCell(params);
};

export const Cell = <T,>(props: ICellProps<T>): JSX.Element => {
  const { cellModel } = props;
  const {
    columnDefinition,
    tableRef,
    rowIndex,
    rowHeight,
    columnIndex,
    cellHighlight,
    eventHandlers,
  } = cellModel;

  const { highlightedRowIndex, highlightedColumnIndex } = cellHighlight;

  const isHighlighted =
    highlightedRowIndex === cellModel.rowIndex ||
    highlightedColumnIndex === columnIndex;

  const cellContent = columnDefinition.cellContentGenerator(cellModel);

  const cellClassName = columnDefinition.cellClassNameGenerator
    ? columnDefinition.cellClassNameGenerator(cellModel)
    : '';

  let width = undefined as undefined | string;
  if (columnDefinition.width) {
    if (columnDefinition.width.endsWith('%') && tableRef.current) {
      const parsedMultiplier =
        parseInt(columnDefinition.width.replace('%', ''), 10) / 100;
      width = `${tableRef.current.offsetWidth * parsedMultiplier}px`;
    }

    if (
      columnDefinition.width.endsWith('px') ||
      columnDefinition.width.endsWith('vw')
    ) {
      width = columnDefinition.width;
    }
  }

  return (
    <td
      className={cn(
        'ArcTable-Cell',
        eventHandlers.didClickCell && 'clickable',
        isHighlighted && 'highlighted',
        cellClassName,
        columnDefinition.className
      )}
      ref={(el) => {
        if (el) updateRowHeight(el, cellModel);
      }}
      onMouseEnter={(event) => {
        didMouseOverCell({ event, cellModel });
      }}
      onMouseLeave={(event) => {
        didMouseLeaveCell({ event, cellModel });
      }}
      onClick={(event) => {
        eventHandlers.didClickCell
          ? eventHandlers.didClickCell({ event, cellModel })
          : undefined;
      }}
      style={{
        height: rowHeight,
        width: width ? width : undefined,
      }}
      align={columnDefinition.cellAlign ? columnDefinition.cellAlign : 'center'}
      valign={
        columnDefinition.cellVAlign ? columnDefinition.cellVAlign : 'middle'
      }
      key={`column:${columnIndex}-row:${rowIndex}`}
    >
      {cellContent}
    </td>
  );
};
