import type { SubTableType } from '../const';
import type { IColumnDefinition } from '@adam-sv/arc';

export interface IPage<T> {
  id: string;
  pageIndex: number;
  data: T[],
  height?: number,
}

export interface ISubtablePage<T> extends IPage<T> {
  subtableType: SubTableType;
  columnDefinitions: IColumnDefinition<T>[];
}
