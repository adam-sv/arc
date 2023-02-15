// dependencies
import { cn, ChartContainer, MouseOver } from '@adam-sv/arc';
// internals
import {
  getIndependentAxis,
  getDependentAxis,
  getAltDependentAxis,
} from './axes';
import { getContent } from './content';
import {
  getCCSizing,
  getDependentScale,
  getIndependentScale,
  getCategoryTicks,
  getDependentTicks,
  getDependentDomain,
  getDependentStackedDomain,
  getIndependentDomain,
  BarChartDependentScale,
} from './helpers';
import { BarChartOrientation, IBarChartDatum } from './types';
// style
import './style.scss';
// types
import type { IBarChartProps } from './types';
import type { D3Range, MousePos } from '../types';
import { ICCSizing } from '../ChartContainer';
import { useEffect, useState } from 'react';
import { IDependentValue } from '../types';

export function BarChart<T = any>(props: IBarChartProps<T>) {
  const [dependentValue, setDependentValue] = useState<IDependentValue>();
  const [mousedOverDatum, setMousedOverDatum] = useState<IBarChartDatum>();
  const [leftAxisWidth, setLeftAxisWidth] = useState<number>(0);
  const {
    independentAxis,
    dependentAxis,
    barOpts,
    resizeTopBottomAxis,
    resizeLeftRightAxis,
  } = props;
  // set defaults
  const orientation = barOpts?.orientation || BarChartOrientation.vertical;
  const data = props.data || [];

  // independent axis setup
  //maybe if there is a secondaryline data we can combine all the values to get the total domain? not sure if that will
  //work
  const independentDomain = getIndependentDomain(data);

  // dependent axis setup

  const dependentDomain = props.stacked
    ? getDependentStackedDomain(data)
    : getDependentDomain(data);

  const dependentTickCount = dependentAxis?.tickCount || 10;

  /*
   * Bottom Axis Setup
   */
  const bottomAxisRenderer = (axisRect: DOMRect, cc: ICCSizing) => {
    const zoom = cc.zooms.x;
    const dependentRange: D3Range = [
      0,
      orientation === BarChartOrientation.horizontal
        ? axisRect.width
        : axisRect.height,
    ];

    const dependentScale = getDependentScale(dependentDomain, dependentRange);

    const independentRange: D3Range = [
      0,
      orientation === BarChartOrientation.horizontal
        ? axisRect.height
        : axisRect.width,
    ];

    const independentScale = getIndependentScale(
      independentDomain,
      independentRange
    );

    const independentTicks = getCategoryTicks(
      independentScale,
      independentDomain
    );

    return orientation === BarChartOrientation.horizontal
      ? getDependentAxis(
          dependentAxis,
          dependentScale,
          getDependentTicks(dependentTickCount, dependentScale, zoom),
          orientation,
          axisRect
        )
      : getIndependentAxis(
          independentTicks,
          independentScale.bandwidth() / 2,
          orientation,
          axisRect
        );
  };

  /*
   * Left Axis Setup
   */
  const leftAxisRenderer = (axisRect: DOMRect, cc: ICCSizing) => {
    useEffect(() => {
      setLeftAxisWidth(axisRect.width);
    }, [axisRect.width]);
    const zoom = cc.zooms.y;
    const dependentRange: D3Range = [
      0,
      orientation === BarChartOrientation.horizontal
        ? axisRect.width
        : axisRect.height,
    ];
    const dependentScale = getDependentScale(dependentDomain, dependentRange);

    const independentRange: D3Range = [
      0,
      orientation === BarChartOrientation.horizontal
        ? axisRect.height
        : axisRect.width,
    ];
    const independentScale = getIndependentScale(
      independentDomain,
      independentRange
    );
    const independentTicks = getCategoryTicks(
      independentScale,
      independentDomain
    );
    return orientation === BarChartOrientation.horizontal
      ? getIndependentAxis(
          independentTicks,
          independentScale.bandwidth() / 2,
          orientation,
          axisRect
        )
      : getDependentAxis(
          dependentAxis,
          dependentScale,
          getDependentTicks(dependentTickCount, dependentScale, zoom),
          orientation,
          axisRect
        );
  };

  /*
   * Right Axis set Up
   */

  const rightAxisRenderer = (axisRect: DOMRect, cc: ICCSizing) => {
    if (!props.secondaryLineData || !props.secondaryLineData.renderAxis)
      return undefined;

    const zoom = cc.zooms.y;
    const dependentRange: D3Range = [
      0,
      orientation === BarChartOrientation.horizontal
        ? axisRect.width
        : axisRect.height,
    ];
    const dependentScale = getDependentScale(
      props.secondaryLineData.dependentDomain,
      dependentRange
    );

    const independentRange: D3Range = [
      0,
      orientation === BarChartOrientation.horizontal
        ? axisRect.height
        : axisRect.width,
    ];
    const independentScale = getIndependentScale(
      independentDomain,
      independentRange
    );
    const independentTicks = getCategoryTicks(
      independentScale,
      independentDomain
    );

    return orientation === BarChartOrientation.horizontal
      ? getIndependentAxis(
          independentTicks,
          independentScale.bandwidth() / 2,
          orientation,
          axisRect
        )
      : getAltDependentAxis(
          dependentScale,
          getDependentTicks(dependentTickCount, dependentScale, zoom),
          orientation,
          axisRect
        );
  };

  const topAxisRenderer = (axisRect: DOMRect, cc: ICCSizing) => {
    if (!props.secondaryLineData || !props.secondaryLineData.renderAxis)
      return undefined;
    const zoom = cc.zooms.y;
    const dependentRange: D3Range = [
      0,
      orientation === BarChartOrientation.horizontal
        ? axisRect.width
        : axisRect.height,
    ];
    const dependentScale = getDependentScale(
      props.secondaryLineData.dependentDomain,
      dependentRange
    );

    const independentRange: D3Range = [
      0,
      orientation === BarChartOrientation.horizontal
        ? axisRect.height
        : axisRect.width,
    ];
    const independentScale = getIndependentScale(
      independentDomain,
      independentRange
    );
    const independentTicks = getCategoryTicks(
      independentScale,
      independentDomain
    );

    return orientation === BarChartOrientation.vertical
      ? getIndependentAxis(
          independentTicks,
          independentScale.bandwidth() / 2,
          orientation,
          axisRect
        )
      : getAltDependentAxis(
          dependentScale,
          getDependentTicks(dependentTickCount, dependentScale, zoom),
          orientation,
          axisRect
        );
  };
  /*
   * Content Setup
   */
  const contentRenderer = (
    graphRect: DOMRect,
    cc: ICCSizing,
    mousePos?: MousePos
  ) => {
    useEffect(() => {
      if (mousePos === undefined) {
        setDependentValue(undefined);
      }
    }, [mousePos]);

    const dependentRange: D3Range = [
      0,
      orientation === BarChartOrientation.horizontal
        ? graphRect.width
        : graphRect.height,
    ];
    const dependentScale = getDependentScale(dependentDomain, dependentRange);

    const lineStringLabelDependentScale = getDependentScale(
      props.secondaryLineData?.dependentDomain ?? [0, 0],
      dependentRange
    );

    const continuousLinesDependentScales = (
      props.continuousLines?.dataArray ?? []
    ).map((d) => {
      return getDependentScale(getDependentDomain(d.data), dependentRange);
    });

    const independentRange: D3Range = [
      0,
      orientation === BarChartOrientation.horizontal
        ? graphRect.height
        : graphRect.width,
    ];
    const independentScale = getIndependentScale(
      independentDomain,
      independentRange
    );
    //This uses a dependent scale for the independent scale because for the Lines with numbers
    //as lables they might have data points that are inbetween two values like 21.5
    //using the dependent scale allows to still get the proper position of these
    const continuousLinesIndependantScale = getDependentScale(
      props.continuousLines?.independentDomain
        ? [
            props.continuousLines?.independentDomain[0],
            props.continuousLines?.independentDomain[1] +
              props.continuousLines?.independentDomainIncrementStep,
          ]
        : [0, 0],
      independentRange
    );

    const independentTicks = getCategoryTicks(
      independentScale,
      independentDomain
    );

    return getContent(
      props,
      independentTicks,
      independentScale,
      getDependentTicks(
        dependentTickCount,
        dependentScale,
        orientation === BarChartOrientation.horizontal ? cc.zooms.x : cc.zooms.y
      ),
      getDependentTicks(
        dependentTickCount,
        lineStringLabelDependentScale,
        orientation === BarChartOrientation.horizontal ? cc.zooms.x : cc.zooms.y
      ),
      dependentScale,
      orientation,
      graphRect,
      dependentValue,
      setDependentValue,
      lineStringLabelDependentScale,
      continuousLinesDependentScales,
      continuousLinesIndependantScale,
      setMousedOverDatum,
      mousePos
    );
  };

  const mouseoverRenderer = () => {
    return !props.disableMouseTracking && dependentValue && mousedOverDatum ? (
      <MouseOver
        key={`Bar-Mouseover`}
        shouldRender={true}
        location={{
          top: dependentValue.top,
          left: dependentValue.left,
        }}
        horizontalSpaceAwayFromTrigger={5}
        verticalSpaceAwayFromTrigger={5}
        positionRelativeToTrigger={'Above'}
        triggerPosition={{
          top: dependentValue.parentBoundaries.top,
          left: dependentValue.parentBoundaries.left,
        }}
        style={props.mouseOverStyle}
        portalTargetElement={props.mouseOverTargetElement}
      >
        {props.customMouseOver ? (
          props.customMouseOver(mousedOverDatum)
        ) : (
          <div>
            {typeof dependentValue.value === 'string'
              ? dependentValue.value
              : dependentValue.value.toFixed(2)}
          </div>
        )}
      </MouseOver>
    ) : null;
  };

  /* Sizing configuration */
  const axisThickness = 80;

  const sizing = getCCSizing(orientation, data, barOpts);

  return (
    <ChartContainer
      className={cn('ArcBarChart', props.className)}
      sizing={sizing}
      minZoom={1}
      maxZoom={1}
      minContentHeight={(props.minHeight || 240) - axisThickness}
      maxContentHeight={
        sizing.mode === 'fits-height'
          ? undefined
          : sizing.controlledCoordinateSpaceSize
      }
      contentRenderer={contentRenderer}
      bottomAxisHeight={
        orientation === BarChartOrientation.horizontal
          ? independentAxis?.axisThickness ?? axisThickness
          : independentAxis?.axisThickness ?? axisThickness
      }
      bottomAxisRenderer={bottomAxisRenderer}
      bottomAxisLabel={
        orientation === BarChartOrientation.horizontal
          ? dependentAxis?.label
          : independentAxis?.label
      }
      leftAxisWidth={
        orientation === BarChartOrientation.horizontal
          ? independentAxis?.axisThickness ?? axisThickness
          : independentAxis?.axisThickness ?? axisThickness
      }
      leftAxisRenderer={leftAxisRenderer}
      leftAxisLabel={
        orientation === BarChartOrientation.horizontal
          ? independentAxis?.label
          : dependentAxis?.label
      }
      resizeTopBottomAxis={resizeTopBottomAxis}
      resizeLeftRightAxis={resizeLeftRightAxis}
      absoluteHTMLRenderer={mouseoverRenderer}
      rightAxisWidth={
        props.secondaryLineData
          ? orientation === BarChartOrientation.horizontal
            ? independentAxis?.axisThickness ?? axisThickness
            : independentAxis?.axisThickness ?? axisThickness
          : 0
      }
      rightAxisRenderer={orientation === 2 ? rightAxisRenderer : undefined}
      rightAxisLabel={props.secondaryLineData?.axisLabel}
      topAxisHeight={
        props.secondaryLineData
          ? orientation === BarChartOrientation.horizontal
            ? independentAxis?.axisThickness ?? axisThickness
            : independentAxis?.axisThickness ?? axisThickness
          : 0
      }
      topAxisRenderer={orientation === 1 ? topAxisRenderer : undefined}
      legend={props.legend}
    />
  );
}
