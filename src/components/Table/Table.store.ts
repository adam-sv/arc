// dependencies
import { action, computed, observable } from 'mobx';
// internals
import { getColumnKey, SubTableType } from './const';
import { EventsStore } from './events.store';
import { PagingStore } from './paging.store';
import { SortStore } from './sort.store';
// types
import type { IColumnDefinition, ITableProps } from './types';

export class TableStore<T> {
  public sortStore: SortStore<T>;
  public pagingStore: PagingStore<T>;
  public eventsStore: EventsStore<T>;
  public props: ITableProps<T>;
  @observable columnDefinitions: IColumnDefinition<T>[] = [];
  @observable columnDefinitionMap: Map<string, IColumnDefinition<T>> = new Map();
  @observable public data: T[] = [];
  @observable public tableElement: HTMLDivElement | undefined = undefined;
  @observable public pinnedTableLeftContainerElement: HTMLDivElement | undefined = undefined;
  @observable public pinnedTableRightContainerElement: HTMLDivElement | undefined = undefined;
  @observable public scrollableTableContainerElement: HTMLDivElement | undefined = undefined;
  @observable public highlightedRow: number | undefined = undefined;
  @observable public highlightedColumn: number | undefined = undefined;

  constructor(props: ITableProps<T>) {
    this.columnDefinitions = [...props.columnDefinitions];

    this.sortedColumnDefinitions.forEach((cd: IColumnDefinition<T>, index) => {
      this.columnDefinitionMap.set(getColumnKey(cd, index), cd);
    });

    this.data = [...props.data];
    this.props = props;

    this.sortStore = new SortStore({
      tableStore: this,
    });

    this.pagingStore = new PagingStore({
      tableStore: this,
      pageSize: props.pageSize,
    });
    this.pagingStore.resetPagingState();

    this.eventsStore = new EventsStore({
      tableStore: this,
      onClickRow: props.onClickRow,
      onHoverCell: props.onHoverCell,
      onMouseLeaveCell: props.onMouseLeaveCell,
      onClickCell: props.onClickCell,
      onClickColumnHeader: props.onClickColumnHeader,
      onHoverColumnHeader: props.onHoverColumnHeader,
      onMouseLeaveColumnHeader: props.onMouseLeaveColumnHeader,
    })

  }

  getOverallColumnIndex(columnDefinition: IColumnDefinition<T>): number {
    return this.sortedColumnDefinitions
      .findIndex((overallCd) => columnDefinition.key === overallCd.key);
  }

  @computed get
  sortedColumnDefinitions(): IColumnDefinition<T>[] {
    return [
      ...this.leftPinnedColumnDefinitions,
      ...this.scrollableColumnDefinitions,
      ...this.rightPinnedColumnDefinitions,
    ];
  }

  @computed get
  scrollableColumnDefinitions(): IColumnDefinition<T>[] {
    return this.columnDefinitions.filter(cd => cd.pinned === 'scrollable');
  }

  @computed get
  leftPinnedColumnDefinitions(): IColumnDefinition<T>[] {
    return this.columnDefinitions.filter(cd => !cd.pinned || cd.pinned === 'left');
  }

  @computed get
  rightPinnedColumnDefinitions(): IColumnDefinition<T>[] {
    return this.columnDefinitions.filter(cd => cd.pinned === 'right');
  }

  @action
  setScroll(scrollTop: number, calledBy?: SubTableType) {
    if (this.scrollableTableContainerElement && calledBy !== SubTableType.Scrollable) {
      this.pagingStore.ignoreNextScrollEvent.scrollable = true;
      this.scrollableTableContainerElement.scrollTop = scrollTop;
    }
    if (this.pinnedTableLeftContainerElement && calledBy !== SubTableType.PinnedLeft) {
      this.pagingStore.ignoreNextScrollEvent.pinnedLeft = true;
      this.pinnedTableLeftContainerElement.scrollTop = scrollTop;
    }
    if (this.pinnedTableRightContainerElement && calledBy !== SubTableType.PinnedRight) {
      this.pagingStore.ignoreNextScrollEvent.pinnedRight = true;
      this.pinnedTableRightContainerElement.scrollTop = scrollTop;
    }
  }

  @action
  resetHighlight() {
    this.highlightedRow = undefined;
    this.highlightedColumn = undefined;
  }

  @action
  setContainerRef(element: HTMLDivElement, type: SubTableType) {
    if (type === SubTableType.PinnedLeft) {
      this.pinnedTableLeftContainerElement = element;
    }
    if (type === SubTableType.PinnedRight) {
      this.pinnedTableRightContainerElement = element;
    }
    if (type === SubTableType.Scrollable) {
      this.scrollableTableContainerElement = element;
    }
  }
}
