import React, {
  SyntheticEvent,
  useEffect,
  useState,
  CSSProperties,
} from 'react';
import {
  IBarChartDatum,
  IBarChartProps,
  ISecondaryLineData,
  IContinuousLinesData,
} from './types';
import { ICategoryTick, IDependentValue } from '../types';
import {
  cn,
  Grid,
  RenderableContent,
  MouseOver,
  CheckboxGroup,
} from '@adam-sv/arc';
import { BarChartOrientation } from './types';
import type { MousePos } from '../types';
import * as d3 from 'd3';
import {
  BarChartDependentScale,
  BarChartIndependentScale,
  barOptDefaults,
} from './helpers';
import { clamp } from '../ChartContainer/logic';

// function getValueWithinDiscreteArray<T = any>(arr: T[], indexGuess: number): T {
//   const finalIndex = clamp(indexGuess, 0, arr.length);
//   return arr[finalIndex];
// }

function mousePosOverLap(
  mousePosVal: number,
  dependantPos: number,
  barThickness: number,
  independantVals?: { mouse: number; barMax: number; barMin: number }
) {
  if (
    mousePosVal >= dependantPos &&
    mousePosVal <= dependantPos + barThickness
  ) {
    if (independantVals) {
      const { mouse, barMax, barMin } = independantVals;
      if (mouse >= barMin && mouse <= barMax) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
  return false;
}

export const getContent = <T,>(
  props: IBarChartProps<T>,
  independentTicks: ICategoryTick[],
  independentScale: BarChartIndependentScale,
  dependentTicks: number[],
  altDependentTicks: number[],
  dependentScale: BarChartDependentScale,
  orientation: BarChartOrientation,
  graphRect: DOMRect,
  dependentValue: IDependentValue | undefined,
  setdependentValue: React.Dispatch<
    React.SetStateAction<IDependentValue | undefined>
  >,
  secondaryLineDataDependentScale: BarChartDependentScale,
  continuousLinesDependentScales: BarChartDependentScale[],
  continuousLinesIndependantScale: BarChartDependentScale,
  setMouseOverDatum: React.Dispatch<
    React.SetStateAction<IBarChartDatum | undefined>
  >,
  mousePos?: MousePos
) => {
  const [dependentLines, setDependentLines] = useState({
    main: true,
    alt: false,
  });

  const { children } = props;
  const { height, width } = graphRect;
  const calcBarInfo: {
    barThickness: number;
    barOffset: number;
    barPadding: number;
  } = { barThickness: 0, barOffset: 0, barPadding: 0 };

  const xTicks =
    orientation === BarChartOrientation.horizontal
      ? dependentTicks.map((v) => dependentScale(v))
      : independentTicks.map((t) => t.startPos);

  const yTicks =
    orientation === BarChartOrientation.horizontal
      ? independentTicks.map((t) => t.startPos)
      : dependentTicks.map((v) => graphRect.height - dependentScale(v));

  const scaledAltDependentTicks =
    orientation === BarChartOrientation.horizontal
      ? altDependentTicks.map((v) => dependentScale(v))
      : altDependentTicks.map(
          (v) => graphRect.height - secondaryLineDataDependentScale(v)
        );

  const xScale =
    orientation === BarChartOrientation.horizontal
      ? dependentScale
      : independentScale;
  const yScale =
    orientation === BarChartOrientation.horizontal
      ? independentScale
      : dependentScale;

  // if (mousePos) {
  //   if (orientation === BarChartOrientation.vertical) {
  //     mousePos.yValue = dependentScale.invert(height - mousePos.y);

  //     const datum = getValueWithinDiscreteArray(
  //       props.data,
  //       Math.floor(mousePos.x / (width / xTicks.length))
  //     );
  //     mousePos.xValue = datum?.label ?? '';
  //   } else {
  //     const datum = getValueWithinDiscreteArray(
  //       props.data,
  //       Math.floor(mousePos.y / (height / yTicks.length))
  //     );
  //     mousePos.yValue = datum?.label ?? '';
  //     mousePos.xValue = dependentScale.invert(mousePos.x);
  //   }
  // }

  const linesBehindBars =
    props.continuousLines?.dataArray.filter(
      (line) => !line.renderInfrontOfBars
    ) ?? [];
  const linesInfrontOfBars =
    props.continuousLines?.dataArray.filter(
      (line) => line.renderInfrontOfBars
    ) ?? [];

  return (
    <>
      <rect
        className='ArcBarChart-border'
        x={0}
        y={0}
        width={width}
        height={height}
      />
      <Grid
        xTicks={xTicks}
        yTicks={yTicks}
        boundingRect={new DOMRect(0, 0, width, height)}
      />

      {getBars(
        props,
        independentScale,
        dependentScale,
        graphRect,
        dependentValue,
        setdependentValue,
        calcBarInfo,
        setMouseOverDatum,
        mousePos
      )}
      {dependentLines.main && (
        <Grid
          xTicks={xTicks}
          yTicks={yTicks}
          boundingRect={new DOMRect(0, 0, width, height)}
        />
      )}
      {props.secondaryLineData?.renderAxis && dependentLines.alt && (
        <Grid
          xTicks={
            orientation === BarChartOrientation.horizontal
              ? scaledAltDependentTicks
              : xTicks
          }
          yTicks={
            orientation === BarChartOrientation.horizontal
              ? yTicks
              : scaledAltDependentTicks
          }
          yDashed={
            orientation === BarChartOrientation.horizontal ? false : true
          }
          xDashed={
            orientation === BarChartOrientation.horizontal ? true : false
          }
          boundingRect={new DOMRect(0, 0, width, height)}
        />
      )}
      {props.continuousLines &&
        getContinousLines(
          linesBehindBars,
          continuousLinesIndependantScale,
          continuousLinesDependentScales,
          graphRect,
          calcBarInfo,
          orientation
        )}
      {getBars(
        props,
        independentScale,
        dependentScale,
        graphRect,
        dependentValue,
        setdependentValue,
        calcBarInfo,
        setMouseOverDatum
      )}
      {props.continuousLines &&
        getContinousLines(
          linesInfrontOfBars,
          continuousLinesIndependantScale,
          continuousLinesDependentScales,
          graphRect,
          calcBarInfo,
          orientation
        )}
      {props.secondaryLineData &&
        getSecondaryLines(
          props,
          independentScale,
          secondaryLineDataDependentScale,
          graphRect,
          calcBarInfo,
          orientation
        )}

      <g className='ArcBarChart-canvas'>
        {typeof children === 'function'
          ? children(new DOMRect(0, 0, width, height), xScale, yScale)
          : null}
      </g>
      {props.secondaryLineData?.renderAxis && (
        <foreignObject
          className='ArcBarChart-AxisControlContainer'
          x={0}
          y={0}
          width={width}
          height={height}
        >
          <div className='ArcBarChart-AxisControl'>
            <CheckboxGroup
              items={[
                {
                  key: 'main',
                  label: 'Main Lines',
                  value: dependentLines.main,
                },
                { key: 'alt', label: 'Alt Lines', value: dependentLines.alt },
              ]}
              onChange={(boxes) => {
                const lines = { main: true, alt: false };
                boxes.forEach((box) => {
                  if (box.key === 'main') {
                    lines.main = box.value;
                  } else {
                    lines.alt = box.value;
                  }
                });
                setDependentLines(lines);
              }}
            />
          </div>
        </foreignObject>
      )}
    </>
  );
};

interface IBar<T> extends IBarChartDatum<T> {
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  barLabel: RenderableContent;
  mousedOver?: boolean;
}

const getBars = <T,>(
  props: IBarChartProps<T>,
  independentScale: BarChartIndependentScale,
  dependentScale: BarChartDependentScale,
  graphRect: DOMRect,
  dependentValue: IDependentValue | undefined,
  setDependentValue: React.Dispatch<
    React.SetStateAction<IDependentValue | undefined>
  >,
  calcBarInfo: {
    barThickness: number;
    barOffset: number;
    barPadding: number;
  },
  setMouseOverDatum: React.Dispatch<
    React.SetStateAction<IBarChartDatum | undefined>
  >,
  mousePos?: MousePos
): JSX.Element => {
  const { barOpts, data, stacked } = props;
  const [tempDepVal, setTempDepVal] = useState<IDependentValue>();
  const [tempMouseOverDatum, setTempMouseOverDatum] =
    useState<IBarChartDatum>();
  const orientation = barOpts?.orientation;
  const barPadding = barOpts?.barPadding || barOptDefaults.barPadding;

  useEffect(() => {
    //have to use this for lifecycle methods
    if (
      tempDepVal &&
      (tempDepVal.index !== dependentValue?.index ||
        (tempDepVal.left !== dependentValue?.top &&
          tempDepVal.top !== dependentValue?.left))
    ) {
      setDependentValue(tempDepVal);
      setMouseOverDatum(tempMouseOverDatum);
    } else if (!tempDepVal && dependentValue) {
      setDependentValue(undefined);
      setMouseOverDatum(undefined);
    }
  }, [tempDepVal, tempMouseOverDatum]);

  useEffect(() => {
    if (!mousePos) {
      setTempDepVal(undefined);
    }
  }, [mousePos]);

  const barLabelFormat =
    barOpts?.barLabelFormat ||
    ((categoryIdentifier: string) => <span>{categoryIdentifier}</span>);

  interface IDataCategory {
    categoryId: string;
    data: IBarChartDatum[];
  }
  const categoryData = data.reduce(
    (acc: IDataCategory[], datum: IBarChartDatum) => {
      const categoryId =
        datum.categoryIdentifier || datum.label || 'Unlabelled';
      const existingEntry = acc.find((dc) => dc.categoryId === categoryId);
      if (existingEntry) existingEntry.data.push(datum);
      else acc.push({ categoryId, data: [datum] });
      return acc;
    },
    []
  );
  let mousedOver = false;
  //use above to track when the mouse is currently not over anytiing. Start at false and
  // as we loop through if we do mouse over something set it to true;
  const bars: IBar<T>[] = categoryData.reduce(
    // loop through categories

    (bars: IBar<T>[], dc: IDataCategory, categoryIndex: number) => {
      const { categoryId } = dc;
      const categoryStart = independentScale(categoryId) || 0;
      const graphEnd =
        orientation === BarChartOrientation.horizontal
          ? graphRect.height
          : graphRect.width;
      const categoryEnd =
        categoryIndex < categoryData.length - 1
          ? independentScale(categoryData[categoryIndex + 1].categoryId) || 0
          : graphEnd;

      const maxPossibleBarThickness =
        (categoryEnd - categoryStart) / (props.stacked ? 1 : dc.data.length) -
        barPadding;
      const barThickness = clamp(
        maxPossibleBarThickness,
        props.barOpts?.minBarThickness || barOptDefaults.minBarThickness,
        props.barOpts?.maxBarThickness || Infinity
      );
      const barOffset =
        maxPossibleBarThickness > barThickness
          ? ((maxPossibleBarThickness - barThickness) *
              (props.stacked ? 1 : dc.data.length) +
              barPadding) /
            2
          : barPadding / 2;
      calcBarInfo.barOffset = barOffset;
      calcBarInfo.barThickness = barThickness;
      calcBarInfo.barPadding = barPadding;
      const barsForCategory = dc.data.reduce(
        // loop through each bar in category
        (acc: IBar<T>[], datum: IBarChartDatum, index: number) => {
          if (orientation === BarChartOrientation.horizontal) {
            let lft = 0;
            let rght = 0;
            if (stacked) {
              for (let i = 0; i <= index; i++) {
                if (i < index) {
                  lft += dc.data[i].value;
                }
                rght += dc.data[i].value;
              }
            }
            const left = dependentScale(stacked ? lft : 0);
            const right = dependentScale(stacked ? rght : datum.value);
            const xPos = left;
            const yPos =
              categoryStart +
              (stacked ? 0 : index) * (barThickness + barPadding) +
              barOffset;
            if (mousePos) {
              const absolutePosXOffset =
                (mousePos?.absoluteX ?? 0) - (mousePos?.chartRelativeX ?? 0);
              const absolutePosYOffset =
                (mousePos?.absoluteY ?? 0) - (mousePos?.chartRelativeY ?? 0);
              const mouseOver = mousePosOverLap(
                mousePos.chartRelativeY,
                yPos,
                barThickness,
                stacked
                  ? {
                      mouse: mousePos.chartRelativeX,
                      barMax: right,
                      barMin: left,
                    }
                  : undefined
              );
              if (mouseOver) {
                mousedOver = true;
              }
              if (mouseOver && index !== tempDepVal?.index) {
                setTempMouseOverDatum(datum);
                setTempDepVal({
                  value: datum.value,
                  top: yPos + absolutePosYOffset,
                  left: right + absolutePosXOffset,
                  index: index,
                  parentBoundaries: {
                    top: graphRect.height - yPos + absolutePosYOffset,
                    left: right + absolutePosXOffset,
                  },
                });
              }
            }

            return [
              ...acc,
              {
                ...datum,
                position: { x: xPos, y: yPos },
                size: { width: right - left, height: barThickness },
                barLabel: barLabelFormat(categoryId),
              },
            ];
          } else {
            // default to vertical
            const left = independentScale(categoryId) || 0;
            let btm = 0;
            let tp = 0;
            if (stacked) {
              for (let i = 0; i <= index; i++) {
                if (i < index) {
                  btm += dc.data[i].value;
                }
                tp += dc.data[i].value;
              }
            }
            const top = dependentScale(stacked ? tp : datum.value);
            const bottom = stacked ? dependentScale(btm) : dependentScale(0);
            const xPos =
              left +
              (stacked ? 0 : index) * (barThickness + barPadding) +
              barOffset;
            const yPos = graphRect.height - top;
            if (mousePos) {
              const mouseOver = mousePosOverLap(
                mousePos.chartRelativeX,
                xPos,
                barThickness,
                stacked
                  ? {
                      mouse: mousePos.chartRelativeY,
                      barMax: graphRect.height - bottom,
                      barMin: yPos,
                    }
                  : undefined
              );
              if (mouseOver) {
                mousedOver = true;
              }
              const absolutePosXOffset =
                (mousePos?.absoluteX ?? 0) - (mousePos?.chartRelativeX ?? 0);
              const absolutePosYOffset =
                (mousePos?.absoluteY ?? 0) - (mousePos?.chartRelativeY ?? 0);
              if (
                mouseOver &&
                tempDepVal?.left !== xPos + barThickness + absolutePosXOffset
              ) {
                setTempMouseOverDatum(datum);
                setTempDepVal({
                  value: datum.value,
                  top: graphRect.height - top + absolutePosYOffset,
                  left: xPos + barThickness + absolutePosXOffset,
                  index,
                  parentBoundaries: {
                    top: graphRect.height - top + absolutePosYOffset,
                    left: xPos + absolutePosXOffset,
                  },
                });
              }
            }

            return [
              ...acc,
              {
                ...datum,
                position: {
                  x: xPos,
                  y: yPos,
                },
                size: { width: barThickness, height: top - bottom },
                barLabel: barLabelFormat(categoryId),
              },
            ];
          }
        },
        []
      );
      return [...bars, ...barsForCategory];
    },
    []
  );
  if (!mousedOver && tempDepVal) {
    setTempMouseOverDatum(undefined);
    setTempDepVal(undefined);
  }

  return (
    <>
      <g className='ArcBarChart-data'>
        {bars.map((bar, i) => {
          return (
            <rect
              key={bar.id + `${i}`}
              className={cn(
                'ArcBarChart-bar',
                bar.className,
                bar.position.x + bar.size.width === dependentValue?.left
              )}
              {...bar.position}
              {...bar.size}
              onMouseEnter={(e: SyntheticEvent) => {
                if (barOpts?.onMouseOver) barOpts.onMouseOver(e, bar);
              }}
              onMouseOut={(e: SyntheticEvent) => {
                if (barOpts?.onMouseOut) barOpts.onMouseOut(e, bar);
              }}
            />
          );
        })}
      </g>
    </>
  );
};

const getSecondaryLines = (
  props: IBarChartProps,
  independentScale: BarChartIndependentScale,
  dependentScale: BarChartDependentScale,
  graphRect: DOMRect,
  calcBarInfo: {
    barThickness: number;
    barOffset: number;
    barPadding: number;
  },
  orientation: BarChartOrientation
) => {
  const { secondaryLineData } = props;
  if (!secondaryLineData) return;
  const { data, percentLine } = secondaryLineData;

  const { barOffset, barThickness } = calcBarInfo;
  const linePoints: [number, number][] = [];
  const lines: { x1: number; x2: number; y1: number; y2: number }[] = [];
  const points: { cx: number; cy: number }[] = [];
  const lables: { x: number; y: number; text: string }[] = [];

  const percentLinePoints:
    | { x1: number; x2: number; y1: number; y2: number }
    | undefined = percentLine
    ? orientation === BarChartOrientation.horizontal
      ? {
          x1: dependentScale(percentLine),
          x2: dependentScale(percentLine),
          y1:
            (independentScale(data[0].label ?? '') ?? 0) +
            barOffset +
            barThickness / 2,
          y2:
            (independentScale(data[data.length - 1].label ?? '') ?? 0) +
            barOffset +
            barThickness / 2,
        }
      : {
          y1: graphRect.height - dependentScale(percentLine),
          y2: graphRect.height - dependentScale(percentLine),
          x1:
            (independentScale(data[0].label ?? '') ?? 0) +
            barOffset +
            barThickness / 2,
          x2:
            (independentScale(data[data.length - 1].label ?? '') ?? 0) +
            barOffset +
            barThickness / 2,
        }
    : undefined;
  let xTextOffset = 0;
  let yTextOffset = 0;
  data.forEach((d, i) => {
    if (d.label) {
      if (orientation === BarChartOrientation.horizontal) {
        const x = dependentScale(d.value);
        linePoints.push([
          x,
          (independentScale(d.label ?? '') ?? 0) + barOffset + barThickness / 2,
        ]);
        xTextOffset = 10;
      } else {
        const y = graphRect.height - dependentScale(d.value);
        linePoints.push([
          (independentScale(d.label ?? '') ?? 0) + barOffset + barThickness / 2,
          y,
        ]);
        yTextOffset = -10;
      }
    }
  });

  linePoints.forEach((lp, i) => {
    points.push({ cx: lp[0], cy: lp[1] });
    lables.push({
      x: lp[0] + xTextOffset,
      y: lp[1] + yTextOffset,
      text: `${data[i].value}%`,
    });
    if (i !== 0) {
      lines.push({
        x1: linePoints[i - 1][0],
        x2: lp[0],
        y1: linePoints[i - 1][1],
        y2: lp[1],
      });
    }
  });
  return (
    <g className='ArcBarChart-SecondaryLineData'>
      {percentLinePoints && (
        <line
          className='ArcBarChart-SecondaryLineData-PercentLine'
          x1={percentLinePoints.x1}
          x2={percentLinePoints.x2}
          y1={percentLinePoints.y1}
          y2={percentLinePoints.y2}
        />
      )}

      {lines.map((line, i) => {
        return (
          <line key={i} x1={line.x1} x2={line.x2} y1={line.y1} y2={line.y2} />
        );
      })}
      {points.map((point, i) => {
        return <circle key={i} cx={point.cx} cy={point.cy} r={3} />;
      })}

      {lables.map((label, i) => {
        return (
          <text key={i} x={label.x} y={label.y}>
            {label.text}
          </text>
        );
      })}
    </g>
  );
};

const getContinousLines = (
  continuousLines: IContinuousLinesData[],
  independentScales: BarChartDependentScale,
  dependentScales: BarChartDependentScale[],
  graphRect: DOMRect,
  calcBarInfo: {
    barThickness: number;
    barOffset: number;
    barPadding: number;
  },
  orientation: BarChartOrientation
) => {
  if (!continuousLines) return;
  const { barOffset, barThickness } = calcBarInfo;

  const allDataPoints: [number, number][][] = [];
  continuousLines.forEach((data, i) => {
    const dataPoints: [number, number][] = [];
    data.data.forEach((d) => {
      if (orientation === BarChartOrientation.horizontal) {
        const x = dependentScales[i](d.value);
        dataPoints.push([
          x,
          (independentScales(d.label ?? 0) ?? 0) + barOffset + barThickness / 2,
        ]);
      } else {
        const y = graphRect.height - dependentScales[i](d.value);
        dataPoints.push([
          (independentScales(d.label ?? 0) ?? 0) + barOffset + barThickness / 2,
          y,
        ]);
      }
    });
    if (
      orientation === BarChartOrientation.horizontal &&
      continuousLines[i].fillAreaUndercurve
    ) {
      if (dataPoints[0][0] !== 0) {
        dataPoints.unshift([dataPoints[0][0], graphRect.height]);
      }
      if (dataPoints[dataPoints.length - 1][0] !== 0) {
        dataPoints.push([
          dataPoints[dataPoints.length - 1][0],
          graphRect.height,
        ]);
      }
    } else if (
      orientation === BarChartOrientation.vertical &&
      continuousLines[i].fillAreaUndercurve
    ) {
      if (dataPoints[0][0] !== 0) {
        dataPoints.unshift([dataPoints[0][0], graphRect.height]);
      }
      if (dataPoints[dataPoints.length - 1][0] !== 0) {
        dataPoints.push([
          dataPoints[dataPoints.length - 1][0],
          graphRect.height,
        ]);
      }
    }
    allDataPoints.push(dataPoints);
  });

  const lineFn: d3.Line<[number, number]> = d3
    .line()
    .x((d) => d[0])
    .y((d) => d[1]);

  return (
    <g>
      {allDataPoints.map((d, i) => {
        return (
          <path
            key={i}
            d={lineFn(d) as string}
            strokeWidth={2}
            stroke={continuousLines[i].color}
            fill={
              continuousLines[i].fillAreaUndercurve
                ? continuousLines[i].color
                : 'none'
            }
          />
        );
      })}
    </g>
  );
};
