// dependenncies
import React from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
// internals
import { Cell } from '../Cell';
import { getColumnKey } from '../const';
import { EventsStore } from '../events.store';
import { TableStore } from '../Table.store';
// style
import './style.css';
// types
import type { RenderResults } from '@adam-sv/arc';
import type { ICell } from '../Cell/types';
import type { IRow } from './types';

export interface IRowProps<T> {
  rowModel: IRow<T>;
  tableStore?: TableStore<T>;
}

@inject('tableStore')
@observer
export class Row<T> extends React.Component<IRowProps<T>> {
  @computed get
  eventsStore(): EventsStore<T> {
    return this.props.tableStore!.eventsStore;
  }

  @computed get
  cells(): JSX.Element[] {
    const {
      columnDefinitions,
      rowIndex,
      datum,
    } = this.props.rowModel;
    const cells = columnDefinitions.map((cd, columnIndex) => {
      const cell: ICell<T> = {
        columnDefinition: cd,
        columnIndex,
        datum,
        rowIndex,
      }
      return <Cell<T> key={`cell-${getColumnKey(cd, columnIndex)}-${rowIndex}`} cellModel={cell} />
    });

    return cells;
  }

  render(): RenderResults {
    const {
      rowIndex,
    } = this.props.rowModel;

    const onClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) =>
      this.eventsStore.didClickRow({
        event,
        rowModel: this.props.rowModel,
      })

    return(
      <tr
        onClick={onClick}
        className={[
          'ArcTable-Row',
          `ArcTable-Row-${rowIndex}`,
          this.eventsStore.areRowsClickable ? 'clickable' : '',
        ].join(' ')}
        key={`row-${rowIndex}`}
      >
        {this.cells}
      </tr>);
  }
}
