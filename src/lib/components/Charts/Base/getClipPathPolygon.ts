import type { ChartSide } from '@adam-sv/arc';

export type ClipType = 'diag' | 'short' | 'long';
export type ClipPlace = 'left' | 'right' | 'top' | 'bottom';

export type ClipTypes = Partial<Record<ClipPlace, ClipType>>;

export interface IChartAxisClipPathProps {
  axisSide: ChartSide;
  axisSize: number;
  startingGutterSize: number; // left or top gutter size
  endingGutterSize: number; // right or bottom gutter size
  clipTypes: ClipTypes;
}

interface IGetClipProps {
  clipTypes: ClipTypes;
  left: number;
  right: number;
  top: number;
  bottom: number;
  startingGutterFrac: number;
  endingGutterFrac: number;
}

const getBottomPath = ({
  clipTypes,
  left,
  top,
  bottom,
  startingGutterFrac,
  endingGutterFrac,
  right,
}: IGetClipProps) => {
  const l = clipTypes.left ?? 'diag';
  const r = clipTypes.right ?? 'diag';
  const moveToBottomLeft =
    l === 'diag' || l === 'long'
      ? `${left}% ${bottom}%`
      : `${startingGutterFrac}% ${bottom}%`;
  const lineToChartBottomLeft =
    l === 'diag' || l === 'short'
      ? `${startingGutterFrac}% ${top}%`
      : `${left}% ${top}%`;
  const lineToChartBottomRight =
    r === 'diag' || r === 'short'
      ? `${right - endingGutterFrac}% ${top}%`
      : `${right}% ${top}%`;
  const lineToBottomRight =
    r === 'diag' || r === 'long'
      ? `${right}% ${bottom}%`
      : `${right - endingGutterFrac}% ${bottom}%`;
  return `
      ${moveToBottomLeft}
      ${lineToChartBottomLeft}
      ${lineToChartBottomRight}
      ${lineToBottomRight}
      ${moveToBottomLeft}
    `;
};

const getLeftPath = ({
  clipTypes,
  left,
  top,
  bottom,
  startingGutterFrac,
  endingGutterFrac,
  right,
}: IGetClipProps) => {
  const t = clipTypes.top ?? 'diag';
  const b = clipTypes.bottom ?? 'diag';
  const moveToTopLeft =
    t === 'diag' || t === 'long'
      ? `${left}% ${top}%`
      : `${left}% ${startingGutterFrac}%`;
  const lineToChartTopLeft =
    t === 'diag' || t === 'short'
      ? `${right}% ${startingGutterFrac}%`
      : `${right}% ${top}%`;
  const lineToChartBottomLeft =
    b === 'diag' || b === 'short'
      ? `${right}% ${bottom - endingGutterFrac}%`
      : `${right}% ${bottom}%`;
  const lineToBottomLeft =
    b === 'diag' || b === 'long'
      ? `${left}% ${bottom}%`
      : `${left}% ${bottom - endingGutterFrac}%`;
  return `
      ${moveToTopLeft}
      ${lineToChartTopLeft}
      ${lineToChartBottomLeft}
      ${lineToBottomLeft}
      ${moveToTopLeft}
    `;
};

const getTopPath = ({
  clipTypes,
  left,
  top,
  bottom,
  startingGutterFrac,
  endingGutterFrac,
  right,
}: IGetClipProps) => {
  const l = clipTypes.left ?? 'diag';
  const r = clipTypes.right ?? 'diag';
  const moveToTopLeft =
    l === 'diag' || l === 'long'
      ? `${left}% ${top}%`
      : `${startingGutterFrac}% ${top}%`;
  const lineToTopRight =
    r === 'diag' || r === 'long'
      ? `${right}% ${top}%`
      : `${right - endingGutterFrac}% ${top}%`;
  const lineToChartTopRight =
    r === 'diag' || r === 'short'
      ? `${right - endingGutterFrac}% ${bottom}%`
      : `${right}% ${bottom}%`;
  const lineToChartTopLeft =
    l === 'diag' || l === 'short'
      ? `${startingGutterFrac}% ${bottom}%`
      : `${left}% ${bottom}%`;
  return `
      ${moveToTopLeft}
      ${lineToTopRight}
      ${lineToChartTopRight}
      ${lineToChartTopLeft}
      ${moveToTopLeft}
    `;
};

const getRightPath = ({
  clipTypes,
  left,
  top,
  bottom,
  startingGutterFrac,
  endingGutterFrac,
  right,
}: IGetClipProps) => {
  const t = clipTypes.top ?? 'diag';
  const b = clipTypes.bottom ?? 'diag';
  const moveToTopRight =
    t === 'diag' || t === 'long'
      ? `${right}% ${top}%`
      : `${right}% ${startingGutterFrac}%`;
  const lineToBottomRight =
    b === 'diag' || b === 'long'
      ? `${right}% ${bottom}%`
      : `${right}% ${bottom - endingGutterFrac}%`;
  const lineToChartBottomLeft =
    b === 'diag' || b === 'short'
      ? `${left}% ${bottom - endingGutterFrac}%`
      : `${left}% ${bottom}%`;
  const lineToChartTopLeft =
    t === 'diag' || t === 'short'
      ? `${left}% ${startingGutterFrac}%`
      : `${left}% ${top}%`;
  return `
      ${moveToTopRight}
      ${lineToBottomRight}
      ${lineToChartBottomLeft}
      ${lineToChartTopLeft}
      ${moveToTopRight}
    `;
};

export function getClipPathPolygon({
  axisSide,
  axisSize,
  startingGutterSize,
  endingGutterSize,
  clipTypes = {},
}: IChartAxisClipPathProps) {
  const totalSize = axisSize + startingGutterSize + endingGutterSize;
  const startingGutterFrac = (100 * startingGutterSize) / totalSize;
  const endingGutterFrac = (100 * endingGutterSize) / totalSize;

  const top = 0;
  const bottom = 100;
  const left = 0;
  const right = 100;

  let points = '';

  const pathProps: IGetClipProps = {
    top,
    bottom,
    left,
    right,
    clipTypes,
    startingGutterFrac,
    endingGutterFrac,
  };

  if (axisSide === 'bottom') {
    points = getBottomPath(pathProps);
  } else if (axisSide === 'left') {
    points = getLeftPath(pathProps);
  } else if (axisSide === 'top') {
    points = getTopPath(pathProps);
  } else {
    // side === 'right'
    points = getRightPath(pathProps);
  }

  return points
    .split('\n')
    .map((x) => x.trim())
    .filter(Boolean)
    .join(', ');
}
