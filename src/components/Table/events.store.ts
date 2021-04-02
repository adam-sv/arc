// dependencies
import { action, computed } from 'mobx';
// internals
import { debounce } from '../../util';
import { getColumnKey } from './const';
import { SortStore } from './sort.store';
import { TableStore } from './Table.store';
// types
import type { ICellEventParams, IHeaderEventParams, IRowEventParams } from './types';

export interface IEventsStoreProps<T> {
  tableStore?: TableStore<T>;
  onClickRow: ((params: IRowEventParams<T>) => void) | undefined;
  onClickCell: ((params: ICellEventParams<T>) => void) | undefined;
  onHoverCell: ((params: ICellEventParams<T>) => void) | undefined;
  onMouseLeaveCell: ((params: ICellEventParams<T>) => void) | undefined;
  onClickColumnHeader: ((params: IHeaderEventParams<T>) => void) | undefined;
  onHoverColumnHeader: ((params: IHeaderEventParams<T>) => void) | undefined;
  onMouseLeaveColumnHeader: ((params: IHeaderEventParams<T>) => void) | undefined;
}

export class EventsStore<T> {
  tableStore: TableStore<T>;
  props: IEventsStoreProps<T>;

  constructor(props: IEventsStoreProps<T>) {
    this.tableStore = props.tableStore!;
    this.props = props;
  }
  @computed get
  sortStore(): SortStore<T> {
    return this.tableStore!.sortStore;
  }

  @computed get
  areRowsClickable(): boolean {
    return !!this.props.onClickRow;
  }

  @computed get
  areCellsClickable(): boolean {
    return !!this.props.onClickCell;
  }

  @action
  didClickRow(params: IRowEventParams<T>) {
    if (this.props.onClickRow) {
      this.props.onClickRow(params);
    }
  }

  @action
  didClickCell(params: ICellEventParams<T>) {
    if (this.props.onClickCell) {
      this.props.onClickCell(params);
    }
  }

  @action
  didMouseOverCell(params: ICellEventParams<T>) {
    this.debouncedDidMouseOverCell(params);
  }

  debouncedDidMouseOverCell =
    debounce((params: ICellEventParams<T>) => {
      // highlight appropriate row and column
      const { highlightOnHover } = this.tableStore.props;
      if (highlightOnHover) {
        if (highlightOnHover.includes('horizontal')) {
          this.tableStore.highlightedRow = params.cellModel.rowIndex;
        }

        if (highlightOnHover.includes('vertical')) {
          const overallColumnIndex = this.tableStore
            .getOverallColumnIndex(params.cellModel.columnDefinition);

          this.tableStore.highlightedColumn = overallColumnIndex;
        }
      }

      // callback
      const { onHoverCell } = this.props;
      if (onHoverCell) {
        onHoverCell(params);
      }
    }, 200);

  @action
  didMouseLeaveCell(params: ICellEventParams<T>) {
    this.debouncedDidMouseLeaveCell(params);
  }

  debouncedDidMouseLeaveCell =
    debounce((params: ICellEventParams<T>) => {
      // clear highlight
      this.tableStore.highlightedColumn = undefined;
      this.tableStore.highlightedRow = undefined;

      // callback
      const { onMouseLeaveCell } = this.props;
      if (onMouseLeaveCell) {
        onMouseLeaveCell(params);
      }
    }, 200);

  @action
  didMouseOverColumnHeader(params: IHeaderEventParams<T>) {
    this.debouncedDidMouseOverColumnHeader(params);
  }

  debouncedDidMouseOverColumnHeader =
    debounce((params: IHeaderEventParams<T>) => {
      // highlight appropriate column
      const { highlightOnHover } = this.tableStore.props;
      if (highlightOnHover) {
        if (highlightOnHover.includes('vertical')) {
          const overallColumnIndex = this.tableStore.getOverallColumnIndex(params.columnDefinition);
          this.tableStore.highlightedColumn = overallColumnIndex;
        }
      }

      // callback
      const { onHoverColumnHeader } = this.props;
      if (onHoverColumnHeader) {
        onHoverColumnHeader(params);
      }
    }, 200);

  @action
  didMouseLeaveColumnHeader(params: IHeaderEventParams<T>) {
    if (this.props.onMouseLeaveColumnHeader) {
      this.props.onMouseLeaveColumnHeader(params);
    }
  }

  debouncedDidMouseLeaveColumnHeader =
    debounce((params: IHeaderEventParams<T>) => {
      // clear highlight
      this.tableStore.highlightedColumn = undefined;

      // callback
      const { onMouseLeaveColumnHeader } = this.props;
      if (onMouseLeaveColumnHeader) {
        onMouseLeaveColumnHeader(params);
      }
    }, 200);

  @action
  didClickColumnHeader(eventParams: IHeaderEventParams<T>) {
    const columnDefinition = eventParams.columnDefinition;
    const overallColumnIndex = this.tableStore.getOverallColumnIndex(columnDefinition);

    // if column is sortable, sort by this column
    if (columnDefinition.sortKey || columnDefinition.sortFunction) {
      const columnKey = getColumnKey(columnDefinition, overallColumnIndex);
      const formerSortKey = this.sortStore.sortedColumnKey;
      this.sortStore.sortedColumnKey = columnKey;

      if (formerSortKey === columnKey) {
        // already sorting by this key, so invert
        const newSortDirections = { ...this.sortStore.sortDirections };
        newSortDirections[columnKey] = newSortDirections[columnKey] * -1;
        this.sortStore.sortDirections = newSortDirections;
      }
      this.tableStore.pagingStore.resetPagingState();
    }

    // callback
    const { onClickColumnHeader } = this.props;
    if (onClickColumnHeader) {
      onClickColumnHeader(eventParams);
    }
  }
}
