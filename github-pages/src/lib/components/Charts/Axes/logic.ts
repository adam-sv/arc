import { CategoryDomain, D3Range } from '../types';

export function computeRelativePositions(rect: DOMRect) {
  return {
    x1: 0,
    y1: 0,
    x2: rect.right - rect.left,
    y2: rect.bottom - rect.top,
  };
}

export function computeCategoryDomain(
  data: string[],
  userDomain?: string[]
): CategoryDomain {
  const domain = [] as string[];
  [data, userDomain].forEach((categoryList) => {
    if (categoryList?.length) {
      categoryList.forEach((str) => {
        if (domain.indexOf(str) < 0) {
          domain.push(str);
        }
      });
    }
  });
  return domain;
}
