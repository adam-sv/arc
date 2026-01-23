// dependencies
import {
  RefObject,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type JSX,
} from 'react';
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
  IColumnDefinition,
  IRow,
  ITableScrollParams,
  IPage,
  ICellHighlight,
  ITableEventHandlers,
  IColumnSort,
  IKeyedColumnDefinition,
} from './types';
import { ITableProps } from '@adam-sv/arc';

const DEFAULT_ROWS_PER_PAGE = 100;

const tableDidScroll = <T,>(props: ITableScrollParams<T>) => {
  const { event } = props;
  event?.persist();
  event?.stopPropagation();
  void throttledTableDidScroll(props);
};

const throttledTableDidScroll = throttle(<T,>(props: ITableScrollParams<T>) => {
  handleTableDidScroll(props);
  void debouncedTableDidScroll(props);
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
  tableRef: RefObject<HTMLDivElement | null> | null,
  rowClassNameGenerator: ((rowModel: IRow<T>) => string) | undefined
): JSX.Element => {
  if (!tableRef) return <div></div>;

  const rowModel: IRow<T> = {
    columnDefinitions,
    rowIndex: index,
    datum,
    cellHighlight,
    eventHandlers,
    tableRef,
    rowClassNameGenerator,
  };
  return <Row key={`row-${rowModel.rowIndex}`} rowModel={rowModel} />;
};

const checkUniqueTitles = <T,>(
  columnDefinitions: IColumnDefinition<T>[]
): boolean => {
  // checking to see if titles can be used as the column key
  // every column definition needs to have a title
  if (columnDefinitions.some((cd) => !cd.title)) return false;
  // every title must be unique
  const titleSet = new Set(columnDefinitions.map((cd) => cd.title));
  return titleSet.size === columnDefinitions.length;
};

export const Table = <T,>(props: ITableProps<T>): JSX.Element => {
  const {
    columnDefinitions,
    data,
    className,
    rowClassNameGenerator,
    onClickCell,
    onClickRow,
    onClickRowContextMenu,
    onHoverCell,
    onHoverColumnHeader,
    onClickColumnHeader,
    onMouseLeaveColumnHeader,
    highlightOnHover,
    domRef,
    defaultSortBy,
    onTableSortChanged,
  } = props;

  const uniqueTitles = useMemo(
    () => checkUniqueTitles(columnDefinitions),
    [columnDefinitions]
  );

  const keyedColumnDefinitions = useMemo(
    () =>
      columnDefinitions.map(
        (cd: IColumnDefinition<T>, index: number) =>
          ({
            ...cd,
            key: uniqueTitles ? cd.title : `column:${index}`,
            index: index,
          }) as IKeyedColumnDefinition<T>
      ),
    [columnDefinitions, uniqueTitles]
  );

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

  if (!uniqueTitles && defaultSortBy?.columnTitle) {
    throw new Error(
      'Error: trying to default sort table when table has missing or non-unique titles'
    );
  }
  if (
    defaultSortBy?.columnTitle &&
    !keyedColumnDefinitions.find(
      (col) => col.title === defaultSortBy.columnTitle
    )
  ) {
    console.error(
      `Trying to sort by column "${defaultSortBy.columnTitle}" but no column title matches that.`
    );
  }
  const defaultSort = defaultSortBy
    ? {
        [defaultSortBy.columnTitle]:
          defaultSortBy.direction === 'desc' ? -1 : 1,
      }
    : {};
  // sort
  const [sortDirections, setSortDirections] =
    useState<Record<string, number>>(defaultSort);

  const [sortByColumn, setSortByColumn] = useState<
    IKeyedColumnDefinition<T> | undefined
  >(
    defaultSortBy
      ? keyedColumnDefinitions.find(
          (col) => col.title === defaultSortBy.columnTitle
        )
      : undefined
  );

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
      didClickRowContextMenu: onClickRowContextMenu,
      didClickCell: onClickCell,
      didHoverCell: onHoverCell,
      didHoverColumnHeader: onHoverColumnHeader,
      didClickColumnHeader: onClickColumnHeader,
      didMouseLeaveColumnHeader: onMouseLeaveColumnHeader,
    } as ITableEventHandlers<T>);
  }, [
    onClickRow,
    onClickRowContextMenu,
    onClickCell,
    onHoverCell,
    onHoverColumnHeader,
    onClickColumnHeader,
    onMouseLeaveColumnHeader,
  ]);

  const eventHooks = useMemo(
    () => ({
      onTableSortChanged: onTableSortChanged,
    }),
    [onTableSortChanged]
  );

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
            scrollContainerRef,
            rowClassNameGenerator
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
      <table ref={domRef}>
        <Header
          columnDefinitions={keyedColumnDefinitions}
          cellHighlight={cellHighlight}
          eventHandlers={eventHandlers}
          columnSort={columnSort}
          eventHooks={eventHooks}
        ></Header>
        {bodies}
      </table>
    </div>
  );
};
