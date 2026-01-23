import { cn, MatIcon } from '@adam-sv/arc';
import { IHeaderEventParams } from '.';
import type {
  ICellHighlight,
  IColumnSort,
  IKeyedColumnDefinition,
  ITableEventHandlers,
  ITableEventHooks,
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
  const { columnDefinition, columnSort, eventHooks } = params;
  const onTableSortChanged = eventHooks.onTableSortChanged;

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
      onTableSortChanged?.(
        columnDefinition.key,
        newSortDirections[columnDefinition.key] === -1 ? 'desc' : 'asc'
      );
    } else {
      onTableSortChanged?.(
        columnDefinition.key,
        sortDirections[columnDefinition.key] === -1 ? 'desc' : 'asc'
      );
    }
  }
};

const getColumnHeader = <T,>(
  columnDefinition: IKeyedColumnDefinition<T>,
  columnIndex: number,
  cellHighlight: ICellHighlight,
  eventHandlers: ITableEventHandlers<T>,
  columnSort: IColumnSort<T>,
  eventHooks: ITableEventHooks
): React.JSX.Element => {
  const headerClasses: string = cn(
    columnDefinition.sortKeyGenerator ? 'sortable' : '',
    columnIndex === cellHighlight.highlightedColumnIndex ? 'highlighted' : '',
    columnDefinition.headerClassName
  );
  const eventParams = {
    columnDefinition,
    columnIndex,
    cellHighlight,
    eventHandlers,
    columnSort,
  };

  const isSortingByColumn =
    columnSort.sortByColumn?.key === columnDefinition.key;
  const sortDirection = columnSort.sortDirections[columnDefinition.key];

  let sortArrow: React.JSX.Element | undefined;
  if (isSortingByColumn) {
    sortArrow = sortDirection > 0 ? <MatIcon.CaretUp /> : <MatIcon.CaretDown />;
  }

  const headerContent = columnDefinition.headerContentGenerator
    ? columnDefinition.headerContentGenerator(columnDefinition)
    : columnDefinition.title || '';

  return (
    <th
      className={headerClasses}
      onClick={(event) => {
        didClickColumnHeader({
          event,
          eventHooks,
          ...eventParams,
        });
      }}
      onMouseOver={(event) => {
        didMouseOverColumnHeader({
          event,
          eventHooks,
          ...eventParams,
        });
      }}
      onMouseOut={(event) => {
        didMouseLeaveColumnHeader({
          event,
          eventHooks,
          ...eventParams,
        });
      }}
      key={`column:${columnDefinition.key}`}
    >
      <span>
        {headerContent}
        {sortArrow}
      </span>
    </th>
  );
};

export interface IHeaderProps<T> {
  columnDefinitions: IKeyedColumnDefinition<T>[];
  cellHighlight: ICellHighlight;
  eventHandlers: ITableEventHandlers<T>;
  columnSort: IColumnSort<T>;
  eventHooks: ITableEventHooks;
}

export const Header = <T,>(props: IHeaderProps<T>): React.JSX.Element => {
  const {
    columnDefinitions,
    cellHighlight,
    eventHandlers,
    columnSort,
    eventHooks,
  } = props;
  const headerCells = columnDefinitions.map(
    (cd: IKeyedColumnDefinition<T>, columnIndex: number) =>
      getColumnHeader(
        cd,
        columnIndex,
        cellHighlight,
        eventHandlers,
        columnSort,
        eventHooks
      )
  );

  return (
    <thead className={'ArcTable-Header'}>
      <tr key='header-row'>{headerCells}</tr>
    </thead>
  );
};
