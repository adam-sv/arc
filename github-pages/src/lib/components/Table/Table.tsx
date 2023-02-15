// dependencies
import React, { RefObject, useLayoutEffect, useRef, useState } from 'react';
// internals
import { cn, generatePseudoRandomId, debounce, throttle } from '@adam-sv/arc';
import {
  getPages,
  getRenderedPages,
  getSpacerHeight,
  getTotalPages,
  getUnloadedNextPages,
  getUnloadedPreviousPages,
  handleTableDidScroll,
} from './paging';
import { Header } from './Header';
import { Page } from './Page';
import { Row } from './Row';
import { getSortedData } from './sort';
// types
import type {
  ICellEventParams,
  IColumnDefinition,
  IHeaderEventParams,
  IRow,
  IRowEventParams,
  ITableScrollParams,
  IPage,
  ICellHighlight,
  TableCellHighlightScheme,
  ITableEventHandlers,
  IColumnSort,
  IKeyedColumnDefinition,
} from './types';

const DEFAULT_ROWS_PER_PAGE = 100;

export interface ITableProps<T> {
  className?: string;
  data: T[];
  columnDefinitions: IColumnDefinition<T>[];
  pageSize?: number;
  onClickRow?: (params: IRowEventParams<T>) => unknown;
  onClickCell?: (params: ICellEventParams<T>) => unknown;
  onHoverCell?: (params: ICellEventParams<T>) => unknown;
  onMouseLeaveCell?: (params: ICellEventParams<T>) => unknown;
  onHoverColumnHeader?: (params: IHeaderEventParams<T>) => unknown;
  onClickColumnHeader?: (params: IHeaderEventParams<T>) => unknown;
  onMouseLeaveColumnHeader?: (params: IHeaderEventParams<T>) => unknown;
  highlightOnHover?: TableCellHighlightScheme;
}

const tableDidScroll = <T,>(props: ITableScrollParams<T>) => {
  const { event } = props;
  event.persist();
  event.stopPropagation();
  throttledTableDidScroll(props);
};

const throttledTableDidScroll = throttle(<T,>(props: ITableScrollParams<T>) => {
  handleTableDidScroll(props);
  debouncedTableDidScroll(props);
}, 8);

const debouncedTableDidScroll = debounce(<T,>(props: ITableScrollParams<T>) => {
  handleTableDidScroll(props);
}, 100);

const getSpacerElement = (spacerHeight: number): JSX.Element => (
  <tbody
    className={`ArcTable-SubTable-spacer`}
    key={`spacer-${generatePseudoRandomId()}`}
  >
    <tr>
      <td style={{ height: `${spacerHeight}px` }}></td>
    </tr>
  </tbody>
);

const getRow = <T,>(
  columnDefinitions: IKeyedColumnDefinition<T>[],
  datum: T,
  index: number,
  cellHighlight: ICellHighlight,
  eventHandlers: ITableEventHandlers<T>,
  tableRef: RefObject<HTMLDivElement> | null
): JSX.Element => {
  if (!tableRef) return <div></div>;

  const rowModel: IRow<T> = {
    columnDefinitions,
    rowIndex: index,
    datum,
    cellHighlight,
    eventHandlers,
    tableRef,
  };
  return <Row key={`row-${rowModel.rowIndex}`} rowModel={rowModel} />;
};

export const Table = <T,>(props: ITableProps<T>): JSX.Element => {
  const {
    columnDefinitions,
    data,
    className,
    onClickCell,
    onClickRow,
    onHoverCell,
    onHoverColumnHeader,
    onClickColumnHeader,
    onMouseLeaveColumnHeader,
    highlightOnHover,
  } = props;

  const [keyedColumnDefinitions, setKeyedColumnDefinitions] = useState<
    IKeyedColumnDefinition<T>[]
  >([]);

  useLayoutEffect(() => {
    setKeyedColumnDefinitions(
      columnDefinitions.map(
        (cd: IColumnDefinition<T>, index: number) =>
          ({
            ...cd,
            key: `column:${index}`,
          } as IKeyedColumnDefinition<T>)
      )
    );
  }, [columnDefinitions]);

  const pageSize = props.pageSize || DEFAULT_ROWS_PER_PAGE;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [pageIndex, setPageIndex] = useState(0);

  //highlight
  const [highlightedRowIndex, setHighlightedRowIndex] = useState<
    undefined | number
  >(undefined);
  const [highlightedColumnIndex, setHighlightedColumnIndex] = useState<
    undefined | number
  >(undefined);

  const [cellHighlight, setCellHighlight] = useState<ICellHighlight>({
    highlightedRowIndex,
    setHighlightedRowIndex,
    highlightedColumnIndex,
    setHighlightedColumnIndex,
    highlightScheme: highlightOnHover,
  });

  useLayoutEffect(() => {
    setCellHighlight({
      highlightedRowIndex,
      setHighlightedRowIndex,
      highlightedColumnIndex,
      setHighlightedColumnIndex,
      highlightScheme: highlightOnHover,
    } as ICellHighlight);
  }, [highlightedRowIndex, highlightedColumnIndex, highlightOnHover]);

  // sort
  const [sortDirections, setSortDirections] = useState<Record<string, number>>(
    {}
  );
  const [sortByColumn, setSortByColumn] = useState<
    IKeyedColumnDefinition<T> | undefined
  >(undefined);

  const [sortedData, setSortedData] = useState<T[]>(
    getSortedData(sortByColumn, sortDirections, data)
  );

  useLayoutEffect(() => {
    setSortedData(getSortedData(sortByColumn, sortDirections, data));
  }, [sortByColumn, sortDirections, data]);

  const resetPaging = () => {
    setPageIndex(0);
    setHighlightedRowIndex(undefined);
    setHighlightedColumnIndex(undefined);
  };

  const columnSort = {
    sortDirections,
    setSortDirections,
    sortByColumn,
    setSortByColumn,
    resetPaging,
  } as IColumnSort<T>;

  // events
  const [eventHandlers, setEventHandlers] = useState<ITableEventHandlers<T>>(
    {}
  );

  useLayoutEffect(() => {
    setEventHandlers({
      didClickRow: onClickRow,
      didClickCell: onClickCell,
      didHoverCell: onHoverCell,
      didHoverColumnHeader: onHoverColumnHeader,
      didClickColumnHeader: onClickColumnHeader,
      didMouseLeaveColumnHeader: onMouseLeaveColumnHeader,
    } as ITableEventHandlers<T>);
  }, [
    onClickRow,
    onClickCell,
    onHoverCell,
    onHoverColumnHeader,
    onClickColumnHeader,
    onMouseLeaveColumnHeader,
  ]);

  // paging
  const [pageHeightMap, setPageHeightMap] = useState(
    new Map() as Map<number, number>
  );

  const [allPages, setAllPages] = useState<IPage<T>[]>(
    getPages(sortedData, pageSize, pageHeightMap, setPageHeightMap)
  );

  useLayoutEffect(() => {
    setAllPages(
      getPages(sortedData, pageSize, pageHeightMap, setPageHeightMap)
    );
  }, [pageHeightMap, sortedData, pageSize]);

  const [topSpacerHeight, setTopSpacerHeight] = useState<number>(0);
  useLayoutEffect(() => {
    setTopSpacerHeight(
      getSpacerHeight(getUnloadedPreviousPages(pageIndex, allPages))
    );
  }, [allPages, pageIndex]);

  const [bottomSpacerHeight, setBottomSpacerHeight] = useState<number>(0);
  useLayoutEffect(() => {
    setBottomSpacerHeight(
      getSpacerHeight(getUnloadedNextPages(pageIndex, allPages))
    );
  }, [allPages, pageIndex]);

  const hasNextPage = pageIndex < getTotalPages(data, pageSize);

  const [renderedPages, setRenderedPages] = useState<IPage<T>[]>([]);

  useLayoutEffect(() => {
    setRenderedPages(
      getRenderedPages(keyedColumnDefinitions, pageIndex, allPages)
    );
  }, [keyedColumnDefinitions, pageIndex, allPages]);

  const [bodies, setBodies] = useState<(JSX.Element | JSX.Element[])[]>([]);
  useLayoutEffect(() => {
    setBodies([
      getSpacerElement(topSpacerHeight),
      renderedPages.map((pageModel: IPage<T>) => {
        const startingRow = pageIndex * pageSize;
        const rows: JSX.Element[] = pageModel.data.map((datum, index) =>
          getRow(
            keyedColumnDefinitions,
            datum,
            startingRow + index,
            cellHighlight,
            eventHandlers,
            scrollContainerRef
          )
        );
        pageModel.rowElements = rows;
        return (
          <Page
            key={pageModel.id}
            pageModel={pageModel}
            currentPageIndex={pageIndex}
          />
        );
      }),
      getSpacerElement(bottomSpacerHeight),
    ]);
  }, [
    bottomSpacerHeight,
    cellHighlight,
    eventHandlers,
    keyedColumnDefinitions,
    pageIndex,
    pageSize,
    renderedPages,
    topSpacerHeight,
  ]);

  return (
    <div
      className={cn('ArcTable', 'ArcTable-scroll-container', className)}
      ref={scrollContainerRef}
      onScroll={(ev) => {
        tableDidScroll({
          event: ev,
          pageIndex,
          setPageIndex,
          pages: allPages,
          scrollContainerRef,
          topSpacerHeight,
          hasNextPage,
        });
      }}
    >
      <table>
        <Header
          columnDefinitions={keyedColumnDefinitions}
          cellHighlight={cellHighlight}
          eventHandlers={eventHandlers}
          columnSort={columnSort}
        ></Header>
        {bodies}
      </table>
    </div>
  );
};
