import {
  cn,
  ChartBase,
  ChartComponents,
  ChartLegend,
  Grid,
  MouseOver,
  Panel,
  SwimLanes,
  TickAxis,
} from '@adam-sv/arc';
const { Bottom, Content, Left, Right, Top } = ChartComponents;
import { useBarChartLogic } from './logic';
import './style.scss';
import type { IBarChartProps } from '@adam-sv/arc';
import type { SyntheticEvent, JSX } from 'react';

export function BarChart({
  className,
  style,
  axisSettings,
  minimumHeight,
  minimumWidth,
  minValue,
  maxValue,
  barOpts,
  data,
  orientation = 'horizontal',
  disableMouseTracking,
  customMouseOver,
  mouseOverTargetElement,
  displayLegend,
  stackedBars,
  lineData,
}: IBarChartProps): JSX.Element {
  const {
    chartState,
    linearScale,
    bandScale,
    lineLinearScale,
    devGetBars,
    setMouseInfo,
    getLines,
    mouseInfo,
    bandDomain,
  } = useBarChartLogic({
    data,
    stackedBars,
    orientation,
    minimumWidth,
    minimumHeight,
    axisSettings,
    barOpts,
    lineData,
    minValue,
    maxValue,
  });

  return (
    <Panel
      className={cn('ChartBaseExample', 'ArcBarChart', className)}
      style={{ padding: 0, ...style }}
    >
      <ChartBase chartState={chartState}>
        <Left label={axisSettings?.left?.label ?? ''}>
          {orientation === 'horizontal' ? (
            <TickAxis scale={linearScale} numberTicks={10} />
          ) : (
            <SwimLanes scale={bandScale} />
          )}
        </Left>
        {lineData && orientation === 'horizontal' && (
          <Right>
            <TickAxis scale={lineLinearScale} numberTicks={10} />
          </Right>
        )}
        {lineData && orientation === 'vertical' && (
          <Top>
            <TickAxis scale={lineLinearScale} numberTicks={10} />
          </Top>
        )}
        <Content>
          {!lineData?.displayGrid && (
            <Grid
              yTicks={
                orientation === 'horizontal'
                  ? linearScale.ticks(10).map(linearScale)
                  : bandScale.domain().map((band) => bandScale(band) ?? 0)
              }
              xTicks={
                orientation === 'vertical'
                  ? linearScale.ticks(10).map(linearScale)
                  : bandScale.domain().map((band) => bandScale(band) ?? 0)
              }
            />
          )}
          {lineData?.displayGrid && (
            <Grid
              yTicks={
                orientation === 'horizontal'
                  ? lineLinearScale.ticks(10).map(lineLinearScale)
                  : bandScale.domain().map((band) => bandScale(band) ?? 0)
              }
              xTicks={
                orientation === 'vertical'
                  ? lineLinearScale.ticks(10).map(lineLinearScale)
                  : bandScale.domain().map((band) => bandScale(band) ?? 0)
              }
            />
          )}
          <g className='ArcBarChart-Bars'>
            {devGetBars().map((bar, i) => {
              return (
                <rect
                  key={i}
                  className={cn('ArcBarChart-Bar', bar.datum.className ?? '')}
                  {...bar.position}
                  {...bar.size}
                  onClick={(e: SyntheticEvent) => {
                    if (barOpts?.onClick) barOpts.onClick(e, bar.datum);
                  }}
                  onMouseOver={(e: SyntheticEvent) => {
                    if (barOpts?.onMouseOver) barOpts.onMouseOver(e, bar.datum);
                  }}
                  onMouseEnter={(e) => {
                    const target = (
                      e.target as HTMLElement
                    ).getBoundingClientRect();
                    setMouseInfo({
                      left: target.left + target.width,
                      top: target.top,
                      triggerPosition: { left: target.left, top: target.top },
                      text: bar.datum.value,
                      horizontalSpace: 5,
                      verticalSpace: 5,
                      bar: bar.datum,
                    });
                  }}
                  onMouseOut={(e: SyntheticEvent) => {
                    setMouseInfo(undefined);
                    if (barOpts?.onMouseOut) barOpts.onMouseOut(e, bar.datum);
                  }}
                />
              );
            })}
          </g>
          {lineData && (
            <g className='ArcBarChart-Lines'>
              {getLines().map((element) => {
                return element;
              })}
            </g>
          )}
        </Content>
        <Bottom label={axisSettings?.bottom?.label}>
          {orientation === 'horizontal' ? (
            <SwimLanes scale={bandScale} />
          ) : (
            <TickAxis scale={linearScale} numberTicks={10} />
          )}
        </Bottom>
      </ChartBase>
      {mouseInfo && !disableMouseTracking && (
        <MouseOver
          location={{
            top: mouseInfo.top,
            left: mouseInfo.left,
          }}
          horizontalSpaceAwayFromTrigger={mouseInfo.horizontalSpace}
          verticalSpaceAwayFromTrigger={mouseInfo.verticalSpace}
          positionRelativeToTrigger={'Above'}
          shouldRender={!!mouseInfo}
          triggerPosition={mouseInfo.triggerPosition}
          portalTargetElement={mouseOverTargetElement ?? undefined}
        >
          <div>
            {customMouseOver ? customMouseOver(mouseInfo.bar) : mouseInfo.text}
          </div>
        </MouseOver>
      )}
      {displayLegend && (
        <ChartLegend
          keys={bandDomain.map((d) => {
            return { label: d, className: d };
          })}
        />
      )}
    </Panel>
  );
}
