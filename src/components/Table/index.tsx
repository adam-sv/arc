// dependencies
import React from 'react';
import { action, observable } from 'mobx';
import { observer, Provider } from 'mobx-react';
// internals
import { cn } from '@adam-sv/arc';
import { SubTableType } from './const';
import { SubTable } from './SubTable';
import { TableStore } from './Table.store';
// style
import './style.css';
// types
import type { ITableProps, ICell, ICellEventParams, IColumnDefinition, IHeaderEventParams, IRow, IRowEventParams } from './types';
export type { ITableProps, ICell, ICellEventParams, IColumnDefinition, IHeaderEventParams, IRow, IRowEventParams };

@observer
export class Table<T> extends React.Component<ITableProps<T>> {
  @observable tableStore: TableStore<T>;

  constructor(props: ITableProps<T>) {
    super(props);
    this.tableStore = new TableStore(props);
  }

  @action.bound
  setTableRef(element) {
    this.tableStore.tableElement = element;
  }

  render() {
    return (
      <Provider tableStore={this.tableStore}>
        <div
          className={cn('ArcTable', this.props.className)}
          ref={this.setTableRef}
        >
          <SubTable key={SubTableType.PinnedLeft} type={SubTableType.PinnedLeft} />
          <SubTable key={SubTableType.Scrollable} type={SubTableType.Scrollable} />
          <SubTable key={SubTableType.PinnedRight} type={SubTableType.PinnedRight} />
        </div>
      </Provider>
    );
  }
}
