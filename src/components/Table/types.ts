import type { RenderableContent } from '@adam-sv/arc';
import type { ICell } from './Cell/types';
import type { IRow } from './Row/types';
export type { ICell, IRow };

export interface ICellEventParams<T> {
  event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>;
  cellModel: ICell<T>;
}

export interface IHeaderEventParams<T> {
  event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>;
  columnDefinition: IColumnDefinition<T>;
}

export interface IRowEventParams<T> {
  event: React.MouseEvent<HTMLTableRowElement, MouseEvent>;
  rowModel: IRow<T>;
}

export interface ITableProps<T> {
  className?: string;
  data: T[],
  columnDefinitions: IColumnDefinition<T>[],
  pageSize?: number;
  onClickRow?: (params: IRowEventParams<T>) => void,
  onClickCell?: (params: ICellEventParams<T>) => void,
  onHoverCell?: (params: ICellEventParams<T>) => void,
  onMouseLeaveCell?: (params: ICellEventParams<T>) => void,
  onHoverColumnHeader?: (params: IHeaderEventParams<T>) => void,
  onClickColumnHeader?: (params: IHeaderEventParams<T>) => void,
  onMouseLeaveColumnHeader?: (params: IHeaderEventParams<T>) => void,
  highlightOnHover?: 'horizontal' | 'vertical' | 'vertical horizontal' | 'horizontal vertical',
}

export interface IColumnDefinition<T> {
  title?: string | undefined;
  key: string;
  cellContentGenerator?: (cellModel: ICell<T>) => RenderableContent;
  sortKey?: string;
  sortFunction?: (a: T, b: T) => number;
  width?: string;
  pinned?: 'right' | 'left' | 'scrollable';
  className?: string;
  cellAlign?: 'left' | 'right' | 'center' | 'justify' | 'char';
  cellVAlign?: 'middle' | 'top' | 'bottom' | 'baseline';
}
