// dependencies
import React from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
// intenrals
import { getColumnKey } from '../const';
import { EventsStore } from '../events.store';
import { SortStore } from '../sort.store';
import { TableStore } from '../Table.store';
// style
import './style.css';
// types
import type { RenderResults } from '@adam-sv/arc';
import type { IColumnDefinition } from '../types';

export interface IHeaderProps<T> {
  columnDefinitions: IColumnDefinition<T>[];
  tableStore?: TableStore<T>;
}

@inject('tableStore')
@observer
export class Header<T> extends React.Component<IHeaderProps<T>> {
  @computed get
  tableStore(): TableStore<T> {
    return this.props.tableStore!;
  }

  @computed get
  sortStore(): SortStore<T> {
    return this.tableStore.sortStore;
  }

  @computed get
  eventsStore(): EventsStore<T> {
    return this.tableStore.eventsStore;
  }

  getColumnHeader(columnDefinition): JSX.Element {
    const overallColumnIndex = this.tableStore.getOverallColumnIndex(columnDefinition);

    const classes: string[] = [
      columnDefinition.sortFunction || columnDefinition.sortKey ? 'sortable' : '',
      overallColumnIndex === this.tableStore.highlightedColumn ? 'highlighted' : '',
    ];

    return (
      <th className={classes.join(' ')}
        onClick={(event) => this.eventsStore.didClickColumnHeader({
          event,
          columnDefinition,
        })}
        onMouseOver={event => this.eventsStore.didMouseOverColumnHeader({
          event,
          columnDefinition,
        })}
        onMouseOut={event => this.eventsStore.didMouseLeaveColumnHeader({
          event,
          columnDefinition,
        })}
        key={getColumnKey(columnDefinition, overallColumnIndex)}>
        {columnDefinition.title}
      </th>
    );
  }

  @computed get
  headerCells(): JSX.Element[] {
    return this.props.columnDefinitions.map((cd: IColumnDefinition<T>) => this.getColumnHeader(cd));
  }

  render(): RenderResults {
    return(
      <thead className={'ArcTable-Header'}>
        <tr key="header-row">
          {this.headerCells}
        </tr>
      </thead>
    );
  }
}
