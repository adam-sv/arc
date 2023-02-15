import { generatePseudoRandomId } from '@adam-sv/arc';
import { IColumnDefinition } from '.';
import { IPage, ITableScrollParams } from './types';

export const getOffsetTopForPage = <T = any>(
  pageIndex: number,
  pages: IPage<T>[],
  topSpacerHeight: number
): number | undefined => {
  if (pageIndex > 0) {
    const previousPage = pages[pageIndex - 1];
    const previousPageHeight = previousPage.pageHeightMap.get(
      previousPage.pageIndex
    );
    if (!previousPageHeight) {
      return undefined;
    }
    return topSpacerHeight + previousPageHeight;
  }
  return 0;
};

export const getUnloadedPreviousPages = <T = any>(
  pageIndex: number,
  pages: IPage<T>[]
): IPage<T>[] => {
  // a page was unloaded if it has a height value and is outside of the viewport
  return pageIndex > 0
    ? pages
        .slice(0, pageIndex - 1)
        .filter((p: IPage<T>) => p.pageHeightMap.get(p.pageIndex))
    : [];
};

export const getUnloadedNextPages = <T = any>(
  pageIndex: number,
  pages: IPage<T>[]
): IPage<T>[] => {
  // a page was unloaded if it has a height value and is outside of the viewport
  return pageIndex < pages.length - 1
    ? pages
        .slice(pageIndex + 2, pages.length - 1)
        .filter((p: IPage<T>) => p.pageHeightMap.get(p.pageIndex))
    : [];
};

export const getSpacerHeight = <T = any>(unloadedPages: IPage<T>[]): number => {
  const height = unloadedPages.reduce((accHeight: number, page: IPage<T>) => {
    const pageHeight = page.pageHeightMap.get(page.pageIndex);
    return accHeight + (pageHeight ? pageHeight : 0);
  }, 0);
  return height;
};

export const getTotalPages = <T = any>(data: T[], pageSize: number): number => {
  return Math.ceil(data.length / pageSize);
};

export const handleTableDidScroll = <T>(props: ITableScrollParams<T>) => {
  const {
    event,
    pageIndex,
    pages,
    scrollContainerRef,
    topSpacerHeight,
    hasNextPage,
    setPageIndex,
  } = props;
  const currentPage = pages[pageIndex];
  const scrollTop = event.target.scrollTop;
  if (!scrollContainerRef?.current) return;

  const tableRect = scrollContainerRef.current.getBoundingClientRect();
  const offsetTop = getOffsetTopForPage(pageIndex, pages, topSpacerHeight);
  const currentPageHeight =
    currentPage.pageHeightMap.get(currentPage.pageIndex) || 0;

  const isAtBottomOfCurrentPage =
    offsetTop !== undefined && scrollTop > offsetTop + currentPageHeight;
  const isAtTopOfCurrentPage =
    offsetTop !== undefined && scrollTop < offsetTop - tableRect.height;

  if (
    offsetTop !== undefined &&
    (isAtBottomOfCurrentPage || isAtTopOfCurrentPage)
  ) {
    if (isAtBottomOfCurrentPage && hasNextPage) {
      // ... Load the next page!
      let pageCounter = 1;
      let scrollTopRemainder = scrollTop - (offsetTop + currentPageHeight);
      let nextRenderedPages = pages
        .slice(pageIndex + 1, pages.length)
        .filter((p) => p.pageHeightMap.get(p.pageIndex));

      while (scrollTopRemainder > 0 && nextRenderedPages.length) {
        const nextRenderedPage = nextRenderedPages[0];
        const nextPageHeight =
          nextRenderedPage.pageHeightMap.get(nextRenderedPage.pageIndex) || 0;
        if (nextRenderedPage && nextPageHeight < scrollTopRemainder) {
          scrollTopRemainder -= nextPageHeight;
          nextRenderedPages = nextRenderedPages.slice(1);
          pageCounter++;
        } else {
          break;
        }
      }
      setPageIndex(pageIndex + pageCounter);
    } else if (isAtTopOfCurrentPage && pageIndex > 0) {
      // ... Load the previous page!
      const previousPageIndex = pageIndex - 1;
      const previousPage = pages[previousPageIndex];
      const previousPageHeight =
        previousPage.pageHeightMap.get(previousPage.pageIndex) || 0;

      let pageCounter = 1;
      let scrollTopRemainder = offsetTop - previousPageHeight - scrollTop;
      let previousRenderedPages = pages
        .slice(0, pageIndex)
        .filter((p) => p.pageHeightMap.get(previousPage.pageIndex))
        .reverse();

      while (scrollTopRemainder > 0 && previousRenderedPages.length) {
        const previousRenderedPage = previousRenderedPages[0];
        if (previousRenderedPage && previousPageHeight < scrollTopRemainder) {
          scrollTopRemainder -= previousPageHeight;
          previousRenderedPages = previousRenderedPages.slice(1);
          pageCounter++;
        } else {
          break;
        }
      }
      setPageIndex(pageIndex - pageCounter);
    }
  }
};

export const getPages = <T>(
  sortedData: T[],
  pageSize: number,
  pageHeightMap: Map<number, number>,
  setPageHeightMap: (map: Map<number, number>) => void
): IPage<T>[] => {
  const totalPageCount = getTotalPages(sortedData, pageSize);
  return Array(totalPageCount)
    .fill(0)
    .map((zero: number, index: number) =>
      getNewPageForIndex(
        index,
        pageSize,
        sortedData,
        pageHeightMap,
        setPageHeightMap
      )
    );
};

export const getNewPageForIndex = <T>(
  pageIndex: number,
  pageSize: number,
  sortedData: T[],
  pageHeightMap: Map<number, number>,
  setPageHeightMap: (map: Map<number, number>) => void
): IPage<T> => {
  // calculate data segment
  const lastEntryIndex = sortedData.length;
  const startIndex = pageIndex * pageSize;
  const endIndex = Math.min(startIndex + pageSize, lastEntryIndex);
  const data = sortedData.slice(startIndex, endIndex);

  return {
    id: generatePseudoRandomId(),
    pageIndex,
    data,
    pageHeightMap,
    setPageHeightMap,
  };
};

export const getRenderedPages = <T = any>(
  columnDefinitions: IColumnDefinition<T>[],
  pageIndex: number,
  allPages: IPage<T>[]
): IPage<T>[] => {
  const renderedPages: IPage<T>[] = [];

  const previous = pageIndex > 0 ? allPages[pageIndex - 1] : undefined;
  if (previous) {
    renderedPages.push({
      ...previous,
      columnDefinitions,
    } as IPage<T>);
  }

  const current = allPages[pageIndex];
  if (current) {
    renderedPages.push({
      ...current,
      columnDefinitions,
    } as IPage<T>);
  }

  const next =
    pageIndex < allPages.length - 1 ? allPages[pageIndex + 1] : undefined;
  if (next) {
    renderedPages.push({
      ...next,
      columnDefinitions,
    } as IPage<T>);
  }

  return renderedPages;
};
