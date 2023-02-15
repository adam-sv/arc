import React, { useState } from 'react';
import { Cell } from './Cell';
import type { IRow, ICell } from './types';

const getCells = <T,>(
  rowModel: IRow<T>,
  rowHeight: number,
  setRowHeight: (height: number) => void,
): JSX.Element[] => {
  const {
    columnDefinitions,
    rowIndex,
    datum,
    tableRef,
    cellHighlight,
    eventHandlers,
  } = rowModel;
  const cells = columnDefinitions.map((cd, columnIndex) => {
    const cell: ICell<T> = {
      columnDefinition: cd,
      columnIndex,
      datum,
      rowIndex,
      tableRef,
      rowHeight,
      setRowHeight,
      cellHighlight,
      eventHandlers,
    };
    return <Cell<T>
      key={`Cell-${cd.key}-row:${rowIndex}`}
      cellModel={cell}
    />;
  });

  return cells;
};

export interface IRowProps<T> {
  rowModel: IRow<T>;
}

export const Row = <T,>(props: IRowProps<T>): JSX.Element => {
  const { rowModel } = props;
  const { rowIndex, eventHandlers } = rowModel;
  const [rowHeight, setRowHeight] = useState<number>(0);
  const cells = getCells(rowModel, rowHeight, setRowHeight);

  const onClick = eventHandlers.didClickRow
    ? (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      // typescript doesn't pick up that we've already null-checked...
      if (eventHandlers.didClickRow) eventHandlers.didClickRow({ event, rowModel });
    } : undefined;

  return(
    <tr
      onClick={onClick}
      className={[
        'ArcTable-Row',
        `ArcTable-Row-${rowIndex}`,
        onClick ? 'clickable' : '',
      ].join(' ')}
      key={`row-${rowIndex}`}
    >
      {cells}
    </tr>
  );
};
