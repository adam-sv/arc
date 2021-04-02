// dependencies
import React from 'react';
import { action, computed } from 'mobx';
import { inject, observer } from 'mobx-react';
// internals
import { debounce, throttle } from '../../../util';
import { SubTableType } from '../const';
import { Header } from '../Header';
import { Page } from '../Page';
import { PagingStore } from '../paging.store';
import { TableStore } from '../Table.store';
// style
import './style.css';
// types
import type { RenderResults } from '@adam-sv/arc';
import type { ISubtablePage } from '../Page/types';
import type { IColumnDefinition } from '../types';


export interface ISubTableProps<T> {
  type: SubTableType;
  tableStore?: TableStore<T>;
}

@inject('tableStore')
@observer
export class SubTable<T> extends React.Component<ISubTableProps<T>> {
  private readonly ignoreNextScrollEvent: boolean = false;

  @computed get
  tableStore(): TableStore<T> {
    return this.props.tableStore!;
  }

  @computed get
  pagingStore(): PagingStore<T> {
    return this.tableStore.pagingStore;
  }

  @computed get
  columnDefinitions(): IColumnDefinition<T>[] {
    if (this.props.type === SubTableType.PinnedLeft) {
      return this.tableStore.leftPinnedColumnDefinitions;
    }
    if (this.props.type === SubTableType.PinnedRight) {
      return this.tableStore.rightPinnedColumnDefinitions;
    }
    return this.tableStore.scrollableColumnDefinitions;
  }

  @computed get
  shouldIgnoreNextScrollEvent(): boolean {
    if (this.props.type === SubTableType.PinnedLeft) {
      return this.pagingStore.ignoreNextScrollEvent.pinnedLeft;
    }
    if (this.props.type === SubTableType.PinnedRight) {
      return this.pagingStore.ignoreNextScrollEvent.pinnedRight;
    }
    return this.pagingStore.ignoreNextScrollEvent.scrollable;
  }

  @action.bound
  tableDidScroll(event) {
    event.persist();

    if (this.shouldIgnoreNextScrollEvent) {
      if (this.props.type === SubTableType.PinnedLeft) {
        this.pagingStore.ignoreNextScrollEvent.pinnedLeft = false;
      }
      if (this.props.type === SubTableType.PinnedRight) {
        this.pagingStore.ignoreNextScrollEvent.pinnedRight = false;
      }
      if (this.props.type === SubTableType.Scrollable) {
        this.pagingStore.ignoreNextScrollEvent.scrollable = false;
      }
      return;
    }
    event.stopPropagation();
    this.throttledTableDidScroll(event);
  }

  throttledTableDidScroll = throttle((event) => {
    this.handleTableDidScroll(event);
    this.debouncedTableDidScroll(event);
  }, 8);

  debouncedTableDidScroll = debounce((event) => {
    this.handleTableDidScroll(event);
  }, 100);

  handleTableDidScroll(event) {
    const scrollTop = event.target.scrollTop;
    const { currentPageIndex, currentPage } = this.pagingStore;
    const { tableElement } = this.tableStore;
    if (!tableElement) { return; }

    const tableRect = tableElement.getBoundingClientRect();
    const offsetTop = this.pagingStore.getOffsetTopForPage(currentPageIndex);

    const isAtBottomOfCurrentPage = offsetTop !== undefined
      && scrollTop > (offsetTop + currentPage.height!);
    const isAtTopOfCurrentPage = offsetTop !== undefined
      && (scrollTop < (offsetTop - tableRect.height));

    if (offsetTop !== undefined && (isAtBottomOfCurrentPage || isAtTopOfCurrentPage)) {
      const { pages } = this.pagingStore;
      // changing the page triggers a scroll event, and we want to ignore it across the board

      if (isAtBottomOfCurrentPage && this.pagingStore.hasNextPage) {
        // ... Load the next page!
        let pageCounter = 1;
        let scrollTopRemainder = scrollTop - (offsetTop + currentPage.height!);
        let nextRenderedPages = pages
          .slice(currentPageIndex + 1, pages.length)
          .filter(p => p.height);

        while(scrollTopRemainder > 0 && nextRenderedPages.length) {
          const nextRenderedPage = nextRenderedPages[0];
          if (nextRenderedPage && nextRenderedPage.height! < scrollTopRemainder) {
            scrollTopRemainder -= nextRenderedPage.height!;
            nextRenderedPages = nextRenderedPages.slice(1);
            pageCounter++;
          } else {
            break;
          }
        }
        this.pagingStore.setCurrentPage(currentPageIndex + pageCounter);
        setTimeout(() => {
          this.tableStore.setScroll(scrollTop, this.props.type);
        })
      } else if (isAtTopOfCurrentPage && currentPageIndex > 0){
        // ... Load the previous page!
        const previousPageIndex = currentPageIndex - 1;

        const previousPageHeight = this.pagingStore.pages[previousPageIndex].height!;

        let pageCounter = 1;
        let scrollTopRemainder = (offsetTop - previousPageHeight) - scrollTop;
        let previousRenderedPages = pages
          .slice(0, currentPageIndex)
          .filter(p => p.height)
          .reverse();

        while(scrollTopRemainder > 0 && previousRenderedPages.length) {
          const previousRenderedPage = previousRenderedPages[0];
          if (previousRenderedPage && previousRenderedPage.height! < scrollTopRemainder) {
            scrollTopRemainder -= previousRenderedPage.height!;
            previousRenderedPages = previousRenderedPages.slice(1);
            pageCounter++;
          } else {
            break;
          }
        }
        this.pagingStore.setCurrentPage(currentPageIndex - pageCounter);
        setTimeout(() => {
          this.tableStore.setScroll(scrollTop, this.props.type);
        })
      }
    } else {
      // sync all table container scroll values
      this.tableStore.setScroll(scrollTop, this.props.type);
    }

  }

  @computed get
  pageModels(): ISubtablePage<T>[] {
    return this.pagingStore.getRenderedPageModels(this.props.type);
  }

  @computed get
  pages(): JSX.Element[] {
    return this.pageModels
      .map((pageModel) => {
        return <Page key={pageModel.id} pageModel={pageModel}/>
      }
    );
  }

  @computed get
  bodies(): JSX.Element[] {
    return [
      this.getSpacerElement('top'),
      ...this.pages,
      this.getSpacerElement('bottom'),
    ];
  }

  getSpacerElement(key: 'top' | 'bottom'): JSX.Element {
    const height = key === 'top'
      ? this.pagingStore.topSpacerHeight
      : this.pagingStore.bottomSpacerHeight;
    return (
      <tbody key={`${key}-spacer`} className={`ArcTable-SubTable-${key}-spacer`}>
        <tr><td style={{ height: `${height}px` }}></td></tr>
      </tbody>
    )
  }

  @computed get
  header(): JSX.Element {
    return (
      <Header columnDefinitions={this.columnDefinitions}></Header>
    );
  }

  render(): RenderResults {
    return (
      this.columnDefinitions.length
        ? <div
          className={[
            'ArcTable-SubTable',
            this.props.type,
          ].join(' ')}
          ref={el => {
            this.tableStore.setContainerRef(el!, this.props.type);
          }}
          onScroll={this.tableDidScroll}>
          <table>
            {this.header}
            {this.bodies}
          </table>
        </div>
        : ''
    )
  }
}
