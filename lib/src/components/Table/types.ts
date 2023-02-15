import type { RenderableContent } from '@adam-sv/arc';
import { RefObject } from 'react';

export interface ITableProps<T> {
  className?: string;
  data: T[],
  columnDefinitions: IColumnDefinition<T>[],
  pageSize?: number;
  onClickRow?: (params: IRowEventParams<T>) => unknown,
  onClickCell?: (params: ICellEventParams<T>) => unknown,
  onHoverCell?: (params: ICellEventParams<T>) => unknown,
  onMouseLeaveCell?: (params: ICellEventParams<T>) => unknown,
  onHoverColumnHeader?: (params: IHeaderEventParams<T>) => unknown,
  onClickColumnHeader?: (params: IHeaderEventParams<T>) => unknown,
  onMouseLeaveColumnHeader?: (params: IHeaderEventParams<T>) => unknown,
  highlightOnHover?: TableCellHighlightScheme,
}

export declare type TableCellHighlightScheme =
  'horizontal'
  | 'vertical'
  | 'vertical horizontal'
  | 'horizontal vertical'

export interface ICellEventParams<T> {
  event: React.MouseEvent<HTMLTableCellElement, MouseEvent>;
  cellModel: ICell<T>;
}

export interface IHeaderEventParams<T> {
  event: React.MouseEvent<HTMLTableCellElement, MouseEvent>;
  columnDefinition: IKeyedColumnDefinition<T>;
  columnIndex: number,
  cellHighlight: ICellHighlight,
  eventHandlers: ITableEventHandlers<T>,
  columnSort: IColumnSort<T>,
}

export interface IRowEventParams<T> {
  event: React.MouseEvent<HTMLTableRowElement, MouseEvent>;
  rowModel: IRow<T>;
}

export interface ITableEventHandlers<T> {
  didClickRow?: (params: IRowEventParams<T>) => void;
  didClickCell?: (params: ICellEventParams<T>) => void;
  didHoverCell?: (params: ICellEventParams<T>) => void;
  didMouseLeaveCell?: (params: ICellEventParams<T>) => void;
  didHoverColumnHeader?: <T,>(params: IHeaderEventParams<T>) => void;
  didClickColumnHeader?: (params: IHeaderEventParams<T>) => void;
  didMouseLeaveColumnHeader?: (params: IHeaderEventParams<T>) => void;
}

export interface IColumnDefinition<T> {
  title?: string | undefined;
  cellContentGenerator: (cellModel: ICell<T>) => RenderableContent;
  sortKeyGenerator?: (rowDatum: T) => number | string;
  width?: string;
  className?: string;
  cellAlign?: 'left' | 'right' | 'center' | 'justify' | 'char';
  cellVAlign?: 'middle' | 'top' | 'bottom' | 'baseline';
}

export interface IKeyedColumnDefinition<T> extends IColumnDefinition<T> {
  key: string
}

export interface ICell<T> {
  datum: T;
  columnDefinition: IKeyedColumnDefinition<T>;
  rowIndex: number;
  columnIndex: number;
  tableRef: RefObject<HTMLDivElement>;
  rowHeight: number | undefined;
  setRowHeight: (height: number) => void;
  cellHighlight: ICellHighlight;
  eventHandlers: ITableEventHandlers<T>;
}

export interface IRow<T> {
  datum: T;
  rowIndex: number;
  columnDefinitions: IKeyedColumnDefinition<T>[];
  cellHighlight: ICellHighlight,
  eventHandlers: ITableEventHandlers<T>,
  tableRef: RefObject<HTMLDivElement>,
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
  data: T[],
  pageHeightMap: Map<number, number>;
  setPageHeightMap: (map: Map<number, number>) => void;
  rowElements?: JSX.Element[];
}

export interface ITableScrollParams<T> {
  event: any;
  pageIndex: number;
  pages: IPage<T>[];
  scrollContainerRef: RefObject<HTMLDivElement>;
  topSpacerHeight: number;
  hasNextPage: boolean;
  setPageIndex: (pageIndex: number) => void;
}
