// dependenncies
import { computed, observable } from 'mobx';
// internals
import { getColumnKey } from './const';
import { TableStore } from './Table.store';

export interface ISortStoreProps<T> {
  tableStore: TableStore<T>;
}

export class SortStore<T> {
  tableStore: TableStore<T>;
  @observable public sortDirections = {};
  @observable public sortedColumnKey: string | undefined = undefined;

  constructor(props: ISortStoreProps<T>) {
    this.tableStore = props.tableStore;

    // set default sort directions
    props.tableStore.sortedColumnDefinitions
      .forEach((cd, index) => {
        if (cd.sortKey || cd.sortFunction) {
          this.sortDirections[getColumnKey(cd, index)] = 1;
        }
      });
  }

  @computed get
  sortedData(): T[]  {
    const unsortedData = this.tableStore.data;
    const { sortedColumnKey, sortDirections } = this;

    // if we haven't selected a key by which to sort, render in the given order
    if (!sortedColumnKey) { return [...unsortedData] }

    const sortDirection = sortDirections[sortedColumnKey];
    const columnDefinition = this.tableStore.columnDefinitionMap.get(sortedColumnKey)!;
    const sortKey = columnDefinition.sortKey ? columnDefinition.sortKey : columnDefinition.key;

    const sortFunction = columnDefinition.sortFunction
      ? (a: T, b: T) => columnDefinition.sortFunction!(a, b) * sortDirection
      : (a: T, b: T) => {
      // if sort function wasn't provided, simply use greater-/less-than
      // on the provided sortKey and hope for the best!
      const fieldA = a[sortKey];
      const fieldB = b[sortKey];
      if (fieldA === fieldB) {  return 0; }
      return (fieldA > fieldB ? 1 : -1) * sortDirection;
    };

    return [...unsortedData].sort(sortFunction);
  }
}
