// dependencies
import React from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
// internals
import { PagingStore } from '../paging.store';
import { Row } from '../Row';
import { TableStore } from '../Table.store';
// types
import type { RenderResults } from '@adam-sv/arc';
import type { IRow } from '../Row/types';
import type { IPage, ISubtablePage } from './types';

export interface IPageProps<T> {
  pageModel: ISubtablePage<T>;
  tableStore?: TableStore<T>;
}

@inject('tableStore')
@observer
export class Page<T> extends React.Component<IPageProps<T>> {
  @computed get
  pagingStore(): PagingStore<T> {
    return this.props.tableStore!.pagingStore;
  }

  @computed get
  pageModel(): IPage<T> {
    return this.props.pageModel;
  }

  getRow(datum: T, index: number): JSX.Element {
    const rowModel: IRow<T> = {
      columnDefinitions: this.props.pageModel.columnDefinitions,
      rowIndex: index,
      datum,
    }
    return (<Row key={`row-${rowModel.rowIndex}`} rowModel={rowModel}></Row> )
  }

  @computed get
  rows(): JSX.Element[] {
    const startingRow = this.pageModel.pageIndex * this.pagingStore.pageSize;
    return this.pageModel.data.map((datum, index) => {
      return this.getRow(datum, startingRow + index);
    });
  }

  @computed get
  pagePosition(): string {
    if (this.pageModel.pageIndex === this.pagingStore.currentPageIndex) {
      return 'current';
    }

    if (this.pageModel.pageIndex < this.pagingStore.currentPageIndex) {
      return 'previous';
    }

    return 'next';
  }

  render(): RenderResults {
    const classes = ['ArcTable-Page', `${this.pagePosition}-page`];
    return(
      <tbody
        ref={(el) => {
          if (!el) return;
          this.pagingStore.pageElementMap.set(this.pageModel.pageIndex, el);
        }}
        key={this.pageModel.id}
        className={classes.join(' ')}
      >
        {this.rows}
      </tbody>
    );
  }
}
