import { SyntheticEvent } from 'react';
import {
  ChartBase,
  ChartComponents,
  cn,
  Grid,
  SwimLanes,
  TickAxis,
  EdgeRouter,
  MouseOver,
  IGanttChart,
  GraphNodeId,
} from '@adam-sv/arc';

import { useGanttChartLogic } from './logic';

import './style.scss';

const { Bottom, Content, Left } = ChartComponents;

export const GanttChart = <NodeType, NodeIdType extends GraphNodeId>({
  data,
  barOpts,
  edges,
  edgeMode,
  edgeSpacing,
  connectionActions,
  axisSettings,
  minContentHeight,
  zoomSettings,
  mouseOverContent,
  mouseOverTargetElement,
  valueDomain,
  className,
  style,
}: IGanttChart<NodeType, NodeIdType>) => {
  const {
    chartState,
    bandScale,
    linearScale,
    numberTicks,
    locatedData,
    setMouseInfo,
    graph,
    mouseInfo,
    getPosition,
  } = useGanttChartLogic({
    data,
    axisSettings,
    barOpts,
    zoomSettings,
    minContentHeight,
    valueDomain,
    edges,
  });

  return (
    <>
      <ChartBase
        className={cn('ArcGanttChart', className)}
        chartState={chartState}
        style={style}
      >
        <Left label={axisSettings?.left?.label} showScrollBars>
          <SwimLanes scale={bandScale} />
        </Left>
        <Content>
          <Grid
            xTicks={linearScale.ticks(numberTicks).map(linearScale)}
            yTicks={bandScale.domain().map((band) => bandScale(band) ?? 0)}
          />

          <g className='ArcGanttChart-Bars'>
            {locatedData.map((ld) => {
              return (
                <rect
                  key={ld.id}
                  className={cn(
                    'ArcGanttChart-Bar',
                    ld.className,
                    barOpts.onMouseOver && 'is-hoverable'
                  )}
                  {...ld.position}
                  {...ld.size}
                  onClick={(e: SyntheticEvent) => {
                    if (barOpts.onClick) barOpts.onClick(e, ld.datum);
                  }}
                  onMouseOver={(e: SyntheticEvent) => {
                    if (barOpts.onMouseOver) barOpts.onMouseOver(e, ld.datum);
                  }}
                  onMouseEnter={(e: SyntheticEvent) => {
                    const target = (
                      e.target as HTMLElement
                    ).getBoundingClientRect();
                    setMouseInfo({
                      left: target.left + target.width,
                      top: target.top,
                      triggerPosition: { left: target.left, top: target.top },
                      horizontalSpace: 5,
                      verticalSpace: 5,
                      bar: ld.datum,
                    });
                    if (barOpts.onMouseOver) barOpts.onMouseOver(e, ld.datum);
                  }}
                  onMouseOut={(e: SyntheticEvent) => {
                    setMouseInfo(undefined);
                    if (barOpts.onMouseOut) barOpts.onMouseOut(e, ld.datum);
                  }}
                />
              );
            })}
          </g>
          {graph && (
            <g className='ArcGanttChart-Edges'>
              {/* // 1.2.0 TODO: EdgeRouter  */}
              <EdgeRouter<NodeType, never, NodeIdType>
                coordinateSpace={graph.boundingRect}
                connectionActions={connectionActions}
                edgeMode={edgeMode || 'straight'}
                edgeSpacing={edgeSpacing}
                getPosition={getPosition}
                graph={graph}
              />
            </g>
          )}
        </Content>
        <Bottom label={axisSettings?.bottom?.label} showScrollBars>
          <TickAxis
            scale={linearScale}
            dateMode={true}
            numberTicks={numberTicks}
          />
        </Bottom>
      </ChartBase>
      {mouseInfo && mouseOverContent && (
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
          {mouseOverContent(mouseInfo.bar)}
        </MouseOver>
      )}
    </>
  );
};
