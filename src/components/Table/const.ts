export const getColumnKey = (columnDefinition, columnIndex) => {
  const tableTag = columnDefinition.pinned ? columnDefinition.pinned : 'left';
  return `${columnDefinition.key}-${tableTag}-${columnIndex}`;
};

export enum SubTableType {
  Scrollable = 'scrollable',
  PinnedLeft = 'pinned-left',
  PinnedRight = 'pinned-right',
};
