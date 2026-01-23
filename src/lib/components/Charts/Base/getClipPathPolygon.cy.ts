import { getClipPathPolygon } from './getClipPathPolygon';
import { ChartSide } from './types';

const sides: ChartSide[] = ['top', 'bottom', 'left', 'right'];
const style = ['diag', 'long', 'short'];

describe('getClipPathPolygon', () => {
  it('should work for left', () => {
    getClipPathPolygon({
      axisSide: 'left',
      axisSize: 100,
      startingGutterSize: 10,
      endingGutterSize: 10,
      clipTypes: { top: 'long', bottom: 'long' },
    });
  });
  it('should work for top', () => {
    getClipPathPolygon({
      axisSide: 'top',
      axisSize: 100,
      startingGutterSize: 10,
      endingGutterSize: 10,
      clipTypes: { left: 'long', right: 'long' },
    });
  });
  it('should work for bottom', () => {
    getClipPathPolygon({
      axisSide: 'bottom',
      axisSize: 100,
      startingGutterSize: 10,
      endingGutterSize: 10,
      clipTypes: { left: 'long', right: 'long' },
    });
  });
  it('should work for right', () => {
    getClipPathPolygon({
      axisSide: 'right',
      axisSize: 100,
      startingGutterSize: 10,
      endingGutterSize: 10,
      clipTypes: { top: 'long', bottom: 'long' },
    });
  });
  it('should work for all sides', () => {
    sides.forEach((side) => {
      style.forEach((style) => {
        getClipPathPolygon({
          axisSide: side,
          axisSize: 100,
          startingGutterSize: 10,
          endingGutterSize: 10,
          clipTypes: Object.fromEntries(sides.map((s) => [s, style])),
        });
      });
    });
  });
});
