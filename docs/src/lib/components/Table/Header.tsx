import React from 'react';
import { IHeaderEventParams } from '.';
import type {
  ICellHighlight,
  IColumnSort,
  IKeyedColumnDefinition,
  ITableEventHandlers,
} from './types';

const didMouseOverColumnHeader = <T,>(params: IHeaderEventParams<T>) => {
  // highlight appropriate column
  const { columnIndex, cellHighlight, eventHandlers } = params;

  const { highlightScheme } = cellHighlight;
  if (highlightScheme?.includes('vertical')) {
    cellHighlight.setHighlightedColumnIndex(columnIndex);
    cellHighlight.setHighlightedRowIndex(undefined);
  }

  const { didHoverColumnHeader } = eventHandlers;
  if (didHoverColumnHeader) didHoverColumnHeader(params);
};

const didMouseLeaveColumnHeader = <T,>(params: IHeaderEventParams<T>) => {
  // highlight appropriate column
  const { columnIndex, cellHighlight, eventHandlers } = params;

  const { highlightScheme } = cellHighlight;

  if (
    highlightScheme?.includes('vertical') &&
    cellHighlight.highlightedColumnIndex === columnIndex
  ) {
    cellHighlight.setHighlightedColumnIndex(undefined);
  }

  const { didHoverColumnHeader } = eventHandlers;
  if (didHoverColumnHeader) didHoverColumnHeader(params);
};

const didClickColumnHeader = <T,>(params: IHeaderEventParams<T>) => {
  const { columnDefinition, columnSort } = params;

  const { sortDirections, setSortDirections, sortByColumn, setSortByColumn } =
    columnSort;

  // if column is sortable, sort by this column
  if (columnDefinition.sortKeyGenerator) {
    const formerSortColumn = sortByColumn;
    setSortByColumn(columnDefinition);

    if (formerSortColumn && formerSortColumn.key === columnDefinition.key) {
      // already sorting by this key, so invert
      const newSortDirections = { ...sortDirections };
      newSortDirections[columnDefinition.key] =
        newSortDirections[columnDefinition.key] * -1;
      setSortDirections(newSortDirections);
    }
  }
};

const getColumnHeader = <T,>(
  columnDefinition: IKeyedColumnDefinition<T>,
  columnIndex: number,
  cellHighlight: ICellHighlight,
  eventHandlers: ITableEventHandlers<T>,
  columnSort: IColumnSort<T>
): JSX.Element => {
  const classes: string[] = [
    columnDefinition.sortKeyGenerator ? 'sortable' : '',
    columnIndex === cellHighlight.highlightedColumnIndex ? 'highlighted' : '',
  ];
  const eventParams = {
    columnDefinition,
    columnIndex,
    cellHighlight,
    eventHandlers,
    columnSort,
  };

  return (
    <th
      className={classes.join(' ')}
      onClick={(event) =>
        didClickColumnHeader({
          event,
          ...eventParams,
        })
      }
      onMouseOver={(event) =>
        didMouseOverColumnHeader({
          event,
          ...eventParams,
        })
      }
      onMouseOut={(event) =>
        didMouseLeaveColumnHeader({
          event,
          ...eventParams,
        })
      }
      key={`column:${columnDefinition.key}`}
    >
      {columnDefinition.title}
    </th>
  );
};

export interface IHeaderProps<T> {
  columnDefinitions: IKeyedColumnDefinition<T>[];
  cellHighlight: ICellHighlight;
  eventHandlers: ITableEventHandlers<T>;
  columnSort: IColumnSort<T>;
}

export const Header = <T,>(props: IHeaderProps<T>): JSX.Element => {
  const { columnDefinitions, cellHighlight, eventHandlers, columnSort } = props;
  const headerCells = columnDefinitions.map(
    (cd: IKeyedColumnDefinition<T>, columnIndex: number) =>
      getColumnHeader(cd, columnIndex, cellHighlight, eventHandlers, columnSort)
  );

  return (
    <thead className={'ArcTable-Header'}>
      <tr key='header-row'>{headerCells}</tr>
    </thead>
  );
};
