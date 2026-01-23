import type { RenderableContent } from '@adam-sv/arc';
import { RefObject, type JSX } from 'react';

export interface ITableProps<T> {
  className?: string;
  rowClassNameGenerator?: (rowModel: IRow<T>) => string;
  data: T[];
  columnDefinitions: IColumnDefinition<T>[];
  pageSize?: number;
  onClickRow?: (params: IRowEventParams<T>) => unknown;
  onClickRowContextMenu?: (params: IRowEventParams<T>) => unknown;
  onClickCell?: (params: ICellEventParams<T>) => unknown;
  onHoverCell?: (params: ICellEventParams<T>) => unknown;
  onMouseLeaveCell?: (params: ICellEventParams<T>) => unknown;
  onHoverColumnHeader?: (params: IHeaderEventParams<T>) => unknown;
  onClickColumnHeader?: (params: IHeaderEventParams<T>) => unknown;
  onTableSortChanged?: TableSortEvent;
  onMouseLeaveColumnHeader?: (params: IHeaderEventParams<T>) => unknown;
  highlightOnHover?: TableCellHighlightScheme;
  domRef?: RefObject<HTMLTableElement | null>;
  defaultSortBy?: {
    columnTitle: string;
    direction?: 'asc' | 'desc';
  };
}

export declare type TableCellHighlightScheme =
  | 'horizontal'
  | 'vertical'
  | 'vertical horizontal'
  | 'horizontal vertical';

export interface ICellEventParams<T> {
  event: React.MouseEvent<HTMLTableCellElement>;
  cellModel: ICell<T>;
}

export interface IHeaderEventParams<T> {
  event: React.MouseEvent<HTMLTableCellElement>;
  columnDefinition: IKeyedColumnDefinition<T>;
  columnIndex: number;
  cellHighlight: ICellHighlight;
  eventHandlers: ITableEventHandlers<T>;
  eventHooks: ITableEventHooks;
  columnSort: IColumnSort<T>;
}

export interface IRowEventParams<T> {
  event: React.MouseEvent<HTMLTableRowElement>;
  rowModel: IRow<T>;
}

export interface ITableEventHandlers<T> {
  didClickRow?: (params: IRowEventParams<T>) => void;
  didClickRowContextMenu?: (params: IRowEventParams<T>) => void;
  didClickCell?: (params: ICellEventParams<T>) => void;
  didHoverCell?: (params: ICellEventParams<T>) => void;
  didMouseLeaveCell?: (params: ICellEventParams<T>) => void;
  didHoverColumnHeader?: <T>(params: IHeaderEventParams<T>) => void;
  didClickColumnHeader?: (params: IHeaderEventParams<T>) => void;
  didMouseLeaveColumnHeader?: (params: IHeaderEventParams<T>) => void;
}

export type TableSortEvent = (key: string, direction: 'asc' | 'desc') => void;

export interface ITableEventHooks {
  onTableSortChanged?: TableSortEvent;
}

export interface IColumnDefinition<T> {
  title?: string | undefined;
  headerContentGenerator?: (column: IColumnDefinition<T>) => RenderableContent;
  cellContentGenerator: (cellModel: ICell<T>) => RenderableContent;
  cellClassNameGenerator?: (cellModel: ICell<T>) => string;
  sortKeyGenerator?: (rowDatum: T) => number | string;
  width?: string;
  className?: string;
  headerClassName?: string;
  cellAlign?: 'left' | 'right' | 'center' | 'justify' | 'char';
  cellVAlign?: 'middle' | 'top' | 'bottom' | 'baseline';
}

export interface IKeyedColumnDefinition<T> extends IColumnDefinition<T> {
  key: string;
  index: number;
}

export interface ICell<T> {
  datum: T;
  columnDefinition: IKeyedColumnDefinition<T>;
  rowIndex: number;
  columnIndex: number;
  tableRef: RefObject<HTMLDivElement | null>;
  rowHeight: number | undefined;
  setRowHeight: (height: number) => void;
  cellHighlight: ICellHighlight;
  eventHandlers: ITableEventHandlers<T>;
}

export interface IRow<T> {
  datum: T;
  rowIndex: number;
  columnDefinitions: IKeyedColumnDefinition<T>[];
  cellHighlight: ICellHighlight;
  eventHandlers: ITableEventHandlers<T>;
  tableRef: RefObject<HTMLDivElement | null>;
  rowClassNameGenerator?: (rowModel: IRow<T>) => string;
}

export interface ICellHighlight {
  highlightedRowIndex: number | undefined;
  setHighlightedRowIndex: (rowIndex: number | undefined) => void;
  highlightedColumnIndex: number | undefined;
  setHighlightedColumnIndex: (rowIndex: number | undefined) => void;
  highlightScheme?: TableCellHighlightScheme;
}

export interface IColumnSort<T> {
  sortDirections: Record<string, number>;
  setSortDirections: (direction: Record<string, number>) => void;
  sortByColumn: IKeyedColumnDefinition<T> | undefined;
  setSortByColumn: (column: IKeyedColumnDefinition<T> | undefined) => void;
  resetPaging: () => void;
}

export interface IPage<T> {
  id: string;
  pageIndex: number;
  data: T[];
  pageHeightMap: Map<number, number>;
  setPageHeightMap: (map: Map<number, number>) => void;
  rowElements?: JSX.Element[];
}

export interface ITableScrollParams<T> {
  event?: React.UIEvent<HTMLDivElement>;
  pageIndex: number;
  pages: IPage<T>[];
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  topSpacerHeight: number;
  hasNextPage: boolean;
  setPageIndex: (pageIndex: number) => void;
}
