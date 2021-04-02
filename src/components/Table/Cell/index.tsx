// dependencies
import React from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
// internals
import { getColumnKey } from '../const';
import { EventsStore } from '../events.store';
import { TableStore } from '../Table.store';
// styles
import './style.css';
// types
import type { RenderableContent, RenderResults } from '@adam-sv/arc';
import type { ICell } from './types';

export interface ICellProps<T> {
  cellModel: ICell<T>;
  tableStore?: TableStore<T>;
}

@inject('tableStore')
@observer
export class Cell<T> extends React.Component<ICellProps<T>> {
  @computed get
  tableStore(): TableStore<T> {
    return this.props.tableStore!;
  }

  @computed get
  eventsStore(): EventsStore<T> {
    return this.tableStore.eventsStore;
  }

  @computed get
  cellModel(): ICell<T> {
    return this.props.cellModel;
  }

  @computed get
  cellContent(): RenderableContent {
    if (this.cellModel.columnDefinition.cellContentGenerator) {
      return this.cellModel.columnDefinition.cellContentGenerator(this.cellModel);
    }
    return JSON.stringify(this.cellModel.datum);
  }

  @computed get
  isHighlighted(): boolean {
    return (
      (this.tableStore.getOverallColumnIndex(this.cellModel.columnDefinition)
        === this.tableStore.highlightedColumn)
      || (this.cellModel.rowIndex
        === this.tableStore.highlightedRow)
    );
  }

  @computed get
  classNames(): string {
    return [
      'ArcTable-Cell',
      this.eventsStore.areCellsClickable ? `clickable` : '',
      this.isHighlighted ? `highlighted` : '',
    ].join(' ');
  }

  @computed get
  width(): string | undefined {
    const { columnDefinition } = this.cellModel;
    if (columnDefinition.width) {
      if (columnDefinition.width.endsWith('%') && this.tableStore.tableElement) {
        const parsedMultiplier = parseInt(columnDefinition.width.replace('%',  ''), 10) / 100;
        return `${this.tableStore.tableElement.offsetWidth * parsedMultiplier}px`;
      }

      if (columnDefinition.width.endsWith('px') || columnDefinition.width.endsWith('vw') ) {
        return columnDefinition.width;
      }
    }
    return undefined;
  }

  render(): RenderResults {
    const { columnDefinition, rowIndex } = this.cellModel;
    const { rowHeights } = this.tableStore.pagingStore;
    const rowHeight = [...rowHeights][rowIndex];
    const overallColumnIndex =
      this.tableStore.getOverallColumnIndex(this.cellModel.columnDefinition);

    return (
      <td
        className={this.classNames}
        ref={el => {
          if (el) {
            this.tableStore.pagingStore.setCellRef(el, this.cellModel);
          }
        }}
        onMouseEnter={event => this.eventsStore.didMouseOverCell({
          event,
          cellModel: this.cellModel
        })}
        onMouseLeave={event => this.eventsStore.didMouseLeaveCell({
          event,
          cellModel: this.cellModel,
        })}
        onClick={event => this.eventsStore.didClickCell({ event, cellModel: this.cellModel })}
        style={{
          height: rowHeight,
          width: this.width ? `${this.width}` : undefined,
        }}
        align={columnDefinition.cellAlign ? columnDefinition.cellAlign : 'center'}
        valign={columnDefinition.cellVAlign ? columnDefinition.cellVAlign : 'middle'}
        key={`${getColumnKey(columnDefinition, overallColumnIndex)}-${rowIndex}`}
      >
        {this.cellContent}
      </td>
    );
  }
}
