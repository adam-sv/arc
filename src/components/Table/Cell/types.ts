import type { IColumnDefinition } from '../types';

export interface ICell<T> {
  datum: T;
  columnDefinition: IColumnDefinition<T>;
  rowIndex: number;
  columnIndex: number;
}
