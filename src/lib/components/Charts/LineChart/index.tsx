import React, { useState, SyntheticEvent } from 'react';
import {
  ChartBase,
  ChartComponents,
  Panel,
  useChartState,
  cn,
  Grid,
  TickAxis,
  MouseOver,
} from '@adam-sv/arc';

import { ILineChartProps } from '@adam-sv/arc';
import './style.scss';
import { useLineChartLogic } from './logic';

const { Bottom, Content, Left } = ChartComponents;

export const LineChart = ({
  data,
  yMin,
  yMax,
  xMin,
  xMax,
  lineOpts,
  disableMouseTracking,
  axisSettings,
  minContentHeight,
  customMouseOverContent,
  dateMode,
  className,
  style,
}: ILineChartProps) => {
  const {
    chartState,
    yLinearScale,
    xLinearScale,
    numberTicks,
    handleMouseMove,
    allD3Points,
    classNames,
    getLines,
    currentMousePos,
    yValues,
  } = useLineChartLogic({
    data,
    yMin,
    yMax,
    xMin,
    xMax,
    axisSettings,
    minContentHeight,
    lineOpts,
    disableMouseTracking,
  });

  return (
    <Panel
      className={cn('ChartBaseExample', 'ArcLineChart', className)}
      style={{ padding: 0, ...style }}
    >
      <ChartBase chartState={chartState}>
        <Left label={axisSettings?.left?.label} showScrollBars>
          <TickAxis scale={yLinearScale} />
        </Left>
        <Content id={'ArcLineChart-Content'}>
          <Grid
            xTicks={xLinearScale.ticks(numberTicks).map(xLinearScale)}
            yTicks={yLinearScale.ticks(numberTicks).map(yLinearScale)}
          />
          <rect
            className='ArcLineChart-MouseTracker'
            x={0}
            y={0}
            width={chartState.sizes.svg.xRange}
            height={chartState.sizes.svg.yRange}
            onMouseMove={handleMouseMove}
            fill={'transparent'}
          ></rect>

          <g className='ArcLineChart-Lines' onMouseMove={handleMouseMove}>
            {getLines(xLinearScale, yLinearScale, allD3Points, classNames)}
          </g>
          {currentMousePos && (
            <g className='ArcLineChart-MousePosition'>
              <line
                x1={currentMousePos.x}
                x2={currentMousePos.x}
                y1={0}
                y2={chartState.sizes.svg.yRange}
              />
              {yValues.map((value, i) => {
                return (
                  <circle
                    className={classNames[i]}
                    key={i}
                    cx={currentMousePos.x}
                    cy={value}
                  />
                );
              })}
            </g>
          )}
        </Content>
        <Bottom label={axisSettings?.bottom?.label} showScrollBars>
          <TickAxis
            scale={xLinearScale}
            numberTicks={numberTicks}
            dateMode={dateMode}
          />
        </Bottom>
      </ChartBase>
      {currentMousePos &&
        yValues.map((value, i) => {
          const topOffset =
            chartState.refs.content.current?.getBoundingClientRect().top ?? 0;
          const leftOffset =
            chartState.refs.content.current?.getBoundingClientRect().left ?? 0;

          return (
            <div key={i}>
              <MouseOver
                location={{
                  top: value + topOffset,
                  left: currentMousePos.x + leftOffset,
                }}
                horizontalSpaceAwayFromTrigger={20}
                verticalSpaceAwayFromTrigger={0}
                positionRelativeToTrigger={'Center'}
                triggerPosition={{
                  top: value + topOffset,
                  left: currentMousePos.x + leftOffset,
                }}
                shouldRender={true}
              >
                {customMouseOverContent
                  ? customMouseOverContent(value, Object.values(data)[i])
                  : yLinearScale.invert(value).toFixed(2)}
              </MouseOver>
            </div>
          );
        })}
    </Panel>
  );
};
