import { IKeyedColumnDefinition } from './types';

export const getSortedData = <T,>(
  sortByColumnDefinition: IKeyedColumnDefinition<T> | undefined,
  sortDirections: Record<string, number>,
  unsortedData: T[],
): T[] => {
  const sortKeyGenerator = sortByColumnDefinition?.sortKeyGenerator;
  // if we haven't selected a key by which to sort, render in the given order
  if (!sortKeyGenerator) { return [...unsortedData]; }

  const columnKey = sortByColumnDefinition.key;
  if (!sortDirections[columnKey]) sortDirections[columnKey] = 1; // default to ascending
  const sortDirection = sortDirections[columnKey];

  const sortFunction = (a: T, b: T) => {
    const sortValueA = sortKeyGenerator(a);
    const sortValueB = sortKeyGenerator(b);
    if (sortValueA === sortValueB) {  return 0; }
    return (sortValueA > sortValueB ? 1 : -1) * sortDirection;
  };

  return [...unsortedData].sort(sortFunction);
};
