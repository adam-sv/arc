// we pass everything thru Boolean to filter
// then Array.join is applied with a space to make clean class names
declare type FilteredIfFalsyElseStringified = string | unknown;

export const cn = (...classNames: FilteredIfFalsyElseStringified[]) =>
  classNames.filter(Boolean).join(' ');
