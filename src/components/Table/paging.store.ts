// dependencies
import { action, computed, observable } from 'mobx';
// internals
import { debounce, generatePseudoRandomId } from '../../util';
import { SubTableType } from './const';
import { TableStore } from './Table.store';
// types
import type { ICell } from './Cell/types';
import type { IPage, ISubtablePage } from './Page/types';
import type { IColumnDefinition } from './types';

export interface IPagingStoreProps<T> {
  tableStore: TableStore<T>;
  pageSize?: number;
}

export class PagingStore<T> {
  tableStore: TableStore<T>;
  private rowHeightsSwap: number[] = [];
  public pageElementMap: Map<number, HTMLDivElement> = new Map();

  @observable public pageSize: number = 10;
  @observable public pages: IPage<T>[] = [];
  @observable public cellElements: HTMLDivElement[][] = []; // row x column
  @observable public currentPageIndex: number = 0;
  @observable public rowHeights: number[] = [];
  @observable public ignoreNextScrollEvent: {
    scrollable: boolean;
    pinnedLeft: boolean;
    pinnedRight: boolean;
  } = {
    scrollable: false,
    pinnedLeft: false,
    pinnedRight: false,
  };

  constructor(props: IPagingStoreProps<T>) {
    const { pageSize, tableStore } = props;
    this.tableStore = tableStore;
    if (pageSize) {
      this.pageSize = pageSize;
    }
  }

  @action.bound
  setCellRef(element: HTMLDivElement, cellModel: ICell<T>) {
    const { rowIndex, columnIndex } = cellModel;

    if (this.cellElements.length <= rowIndex
      ||!this.cellElements[rowIndex]) {
      this.cellElements[rowIndex] = [];
    }
    this.cellElements[rowIndex][columnIndex] = element;
    const cellHeight = element.clientHeight;
    const existingRowHeight = this.rowHeightsSwap[rowIndex];
    if (!existingRowHeight || cellHeight > existingRowHeight) {
      this.rowHeightsSwap[rowIndex] = cellHeight + 1;
      this.updateRowHeights();
    }
  }

  updateRowHeights = debounce(() => {
    this.rowHeights = [...this.rowHeightsSwap];
    setTimeout(() => {
      this.updatePageHeights();
    })
  }, 25);

  updatePageHeights = () => {
    this.pages[this.currentPageIndex].height =
      this.pageElementMap.get(this.currentPageIndex)?.getBoundingClientRect().height;

    if (this.hasNextPage) {
      this.pages[this.currentPageIndex + 1].height =
        this.pageElementMap.get(this.currentPageIndex + 1)?.getBoundingClientRect().height;
    }
    if (this.currentPageIndex) {
      this.pages[this.currentPageIndex - 1].height =
        this.pageElementMap.get(this.currentPageIndex - 1)?.getBoundingClientRect().height;
    }
  }

  @computed get
  sortedData(): T[] {
    return this.tableStore.sortStore.sortedData;
  }

  @computed get
  totalPages(): number {
    return Math.ceil(this.sortedData.length /  this.pageSize);
  }

  @computed get
  hasNextPage(): boolean {
    return this.currentPageIndex < (this.totalPages - 1);
  }

  @computed get
  unloadedPreviousPages(): IPage<T>[] {
    // a page was unloaded if it has a height value and is outside of the viewport
    return this.currentPageIndex > 0
      ? this.pages
        .slice(0, this.currentPageIndex - 1)
        .filter((p: IPage<T>) => p.height)
      : [];
  }

  @computed get
  unloadedNextPages(): IPage<T>[] {
    // a page was unloaded if it has a height value and is outside of the viewport
    return this.currentPageIndex < (this.pages.length - 1)
      ? this.pages
        .slice(this.currentPageIndex + 2, this.pages.length - 1)
        .filter((p: IPage<T>) => p.height)
      : [];
  }

  @action
  resetPagingState() {
    this.rowHeightsSwap = [];
    this.rowHeights = [];
    this.resetPageModels();
    this.setCurrentPage(0);
    this.tableStore.setScroll(0);
    this.tableStore.resetHighlight();
  }

  resetPageModels() {
    this.pages = Array(this.totalPages).fill(0)
      .map((zero: number, index: number) => {
        return {
          id: generatePseudoRandomId(),
          pageIndex: index,
          data: this.getDataForPage(index),
        };
      });
  }

  getNewPageForIndex(pageIndex: number): IPage<T> {
    return {
      id: generatePseudoRandomId(),
      pageIndex,
      data: this.getDataForPage(pageIndex),
    }
  }

  getDataForPage(pageIndex): T[] {
    const { pageSize, sortedData } = this;
    const lastEntryIndex = sortedData.length;
    const startIndex = pageIndex * pageSize;
    const endIndex = Math.min(startIndex + pageSize, lastEntryIndex);

    return sortedData.slice(startIndex, endIndex);
  }

  getColumnDefinitions(subTableType: SubTableType): IColumnDefinition<T>[] {
    if (subTableType === SubTableType.PinnedLeft) {
      return this.tableStore.leftPinnedColumnDefinitions;
    }
    if (subTableType === SubTableType.PinnedRight) {
      return this.tableStore.rightPinnedColumnDefinitions;
    }
    return this.tableStore.scrollableColumnDefinitions;
  }

  getRenderedPageModels(subTableType: SubTableType): ISubtablePage<T>[] {
    const columnDefinitions = this.getColumnDefinitions(subTableType);
    const pages:ISubtablePage<T>[] = [];
    const { currentPageIndex } = this;

    const previous = currentPageIndex > 0
      ? this.pages[currentPageIndex - 1]
      : undefined;
    if (previous) {
      pages.push({
        ...previous,
        columnDefinitions,
      } as ISubtablePage<T>);
    }

    const current = this.pages[currentPageIndex];
    if (current) {
      pages.push({
        ...current,
        columnDefinitions,
      } as ISubtablePage<T>);
    }

    const next = currentPageIndex < (this.pages.length - 1)
      ? this.pages[currentPageIndex + 1]
      : undefined;
    if (next) {
      pages.push({
        ...next,
        columnDefinitions,
      } as ISubtablePage<T>);
    }

    return pages;
  }

  @computed get
  topSpacerHeight(): number {
    const { unloadedPreviousPages } = this;
    const height = unloadedPreviousPages.reduce((accHeight: number, page: IPage<T>) => {
      const pageHeight = page.height;
      return accHeight + (pageHeight ? pageHeight : 0); // unloaded pages always have a height
    }, 0);
    return height;
  }

  @computed get
  bottomSpacerHeight(): number {
    const { unloadedNextPages } = this;
    const height = unloadedNextPages.reduce((accHeight: number, page: IPage<T>) => {
      const pageHeight = page.height;
      return accHeight + (pageHeight ? pageHeight : 0);
    }, 0);
    return height;
  }

  @computed get
  currentPage(): IPage<T> {
    return this.pages[this.currentPageIndex];
  }

  @computed get
  nextPage(): IPage<T> | undefined {
    if (this.hasNextPage) {
      return this.pages[this.currentPageIndex + 1];
    }
  }

  @computed get
  previousPage(): IPage<T> | undefined {
    if (this.currentPageIndex) {
      return this.pages[this.currentPageIndex - 1];
    }
  }

  getOffsetTopForPage(pageIndex: number): number | undefined {
    if (pageIndex > 0) {
      const previousPageHeight = this.pages[pageIndex - 1].height;
      if (!previousPageHeight) { return undefined; }
      return this.topSpacerHeight + previousPageHeight;
    }
    return 0;
  }

  @action
  setCurrentPage(pageIndex: number) {
    this.currentPageIndex = pageIndex;
  }
}
