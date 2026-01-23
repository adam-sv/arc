import type { RenderableContent } from '@adam-sv/arc';

export const toolTipFunction = (
  x: number,
  y: number,
  xValue: RenderableContent,
  yValue: RenderableContent
): RenderableContent => {
  // maybe also return the bar itself so they can 'rest' something on top of the bar?
  return (
    <foreignObject x={x} y={y} height={'100%'} width={'100%'}>
      <div style={{ width: 'max-content', height: '100px', color: 'green' }}>
        <div>X Val: {xValue}</div>
        <div>Y Val: {yValue}</div>
      </div>
    </foreignObject>
  );
};
