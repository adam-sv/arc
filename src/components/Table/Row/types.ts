import type { IColumnDefinition } from '../types';

export interface IRow<T> {
  datum: T;
  rowIndex: number;
  columnDefinitions: IColumnDefinition<T>[];
}
