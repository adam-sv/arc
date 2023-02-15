import React from 'react';
import { IPage } from './types';

export interface IPageProps<T> {
  pageModel: IPage<T>;
  currentPageIndex: number;
}

export function Page<T,>(props: IPageProps<T>): JSX.Element {
  const {
    pageModel,
    currentPageIndex,
  } = props;

  const {
    pageIndex,
    rowElements,
  } = pageModel;
  let pagePosition = '';
  if (currentPageIndex === pageIndex) pagePosition = 'current';
  else if (currentPageIndex > pageIndex) pagePosition = 'previous';
  else pagePosition = 'next';

  const classes = ['ArcTable-Page', `${pagePosition}-page`];
  return(
    <tbody
      ref={(el) => {
        if (!el) return;
        const height = el.getBoundingClientRect().height;
        const pageHeightMap = pageModel.pageHeightMap;
        pageHeightMap.set(pageModel.pageIndex, height);
        pageModel.setPageHeightMap(pageHeightMap);
      }}
      key={pageModel.id}
      className={classes.join(' ')}
    >
      {rowElements}
    </tbody>
  );
}
