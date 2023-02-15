export const getFractionalXPosForColumn = (
  columnIndex: number,
  totalColumns: number
): number => (totalColumns >= 1 ? columnIndex / (totalColumns - 1) : 0.5);

export const getFractionalYPos = (
  dataPointValue: number,
  axisMax: number,
  axisMin: number
): number => {
  const ypos = 1 - (dataPointValue - axisMin) / (axisMax - axisMin);
  return ypos;
};
