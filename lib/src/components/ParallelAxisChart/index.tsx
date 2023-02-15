import React, { useEffect, useState } from 'react';
import { cn, debounce } from '@adam-sv/arc';
import type {
  IParallelAxisChartColumn,
  ParallelAxisChartDatum,
  IParallelAxisChartProps,
} from '@adam-sv/arc';
import './style.scss';
import { ParallelAxisChartColumn } from './ParallelAxisChartColumn';
import {
  getFractionalXPosForColumn,
  getFractionalYPos,
} from './fractional-positioning';
import { ParallelAxisChartLine } from './ParallelAxisChartLine';

const MIN_MAX_OVERFLOW = 0;
type ParallelAxisChartFilters = Record<string, [number, number]>;

export interface IParallelAxisChartDerivedColumn {
  column: IParallelAxisChartColumn;
  max: number;
  min: number;
  fractionalXPos: number;
}
export interface IParallelAxisChartDerivedDatum {
  datum: ParallelAxisChartDatum;
  fractionalPoints: {
    x: number;
    y: number;
  }[];
}

const getDerivedColumns = (
  columns: IParallelAxisChartColumn[],
  data: ParallelAxisChartDatum[]
): IParallelAxisChartDerivedColumn[] =>
  columns.map((c, i) => {
    const fractionalXPos = getFractionalXPosForColumn(i, columns.length);
    const { key } = c;
    const dataPoints = data
      .map((datum) => datum.values[key])
      .sort((a, b) => a - b);
    const highestDataPoint = dataPoints[dataPoints.length - 1];
    const lowestDataPoint = dataPoints[0];

    const max =
      c.max === undefined
        ? Math.ceil(
            highestDataPoint > 0
              ? highestDataPoint * (1 + MIN_MAX_OVERFLOW)
              : highestDataPoint - lowestDataPoint * MIN_MAX_OVERFLOW
          )
        : c.max;
    const min =
      c.min === undefined
        ? Math.floor(
            lowestDataPoint > 0
              ? lowestDataPoint - highestDataPoint * MIN_MAX_OVERFLOW
              : lowestDataPoint * (1 + MIN_MAX_OVERFLOW)
          )
        : c.min;
    return {
      column: {
        ...c,
        className: cn(
          c.className,
          !i && 'ArcParallelAxisChart-Column-first-column',
          i === columns.length - 1 && 'ArcParallelAxisChart-Column-last-column'
        ),
      },
      max,
      min,
      fractionalXPos,
    };
  });

const getDerivedData = (
  derivedColumns: IParallelAxisChartDerivedColumn[],
  data: ParallelAxisChartDatum[]
): IParallelAxisChartDerivedDatum[] => {
  return data.map((datum) => {
    const fractionalPoints = derivedColumns.map((derivedColumn) => {
      const { max, min, fractionalXPos, column } = derivedColumn;
      const { key } = column;
      const fractionalYPos = getFractionalYPos(datum.values[key], max, min);

      return {
        x: fractionalXPos,
        y: fractionalYPos,
      };
    });
    return { datum, fractionalPoints };
  });
};

const doesDatumPassFilters = (
  datum: ParallelAxisChartDatum,
  filters: ParallelAxisChartFilters
) =>
  Object.keys(filters).every((filterKey) => {
    const datumValue = datum.values[filterKey];
    const filterValues = filters[filterKey];
    if (datumValue === undefined || filterValues === undefined) return true;

    return datumValue >= filterValues[0] && datumValue <= filterValues[1];
  });

const debouncedFilterUpdate = debounce(
  (props: {
    filters: ParallelAxisChartFilters;
    data: ParallelAxisChartDatum[];
    didFilterData?: (newData: ParallelAxisChartDatum[]) => unknown;
  }) => {
    const { filters, data, didFilterData } = props;
    const filteredData = data.filter((datum) =>
      doesDatumPassFilters(datum, filters)
    );
    if (didFilterData) didFilterData(filteredData);
  },
  500
);

export const ParallelAxisChart = (
  props: IParallelAxisChartProps
): JSX.Element => {
  const { className, data, id, columns, style, didFilterData } = props;

  const [derivedColumns, setDerivedColumns] = useState(
    getDerivedColumns(columns, data)
  );

  const [derivedData, setDerivedData] = useState(
    getDerivedData(derivedColumns, data)
  );

  const [filters, setFilters] = useState<ParallelAxisChartFilters>({});

  useEffect(() => {
    const newCols = getDerivedColumns(columns, data);
    setDerivedColumns(newCols);
    setDerivedData(getDerivedData(newCols, data));
  }, [data, columns]);

  useEffect(() => {
    if (didFilterData) {
      void debouncedFilterUpdate({ filters, data, didFilterData });
    }
  }, [filters, data, didFilterData]);

  const didUpdateFilterSlider = (
    derivedColumn: IParallelAxisChartDerivedColumn,
    filterValues: [number, number]
  ) => {
    const newFilters = { ...filters };
    newFilters[derivedColumn.column.key] = filterValues;
    setFilters(newFilters);
  };

  return (
    <div
      className={cn('ArcParallelAxisChart', className)}
      id={id}
      style={style}
    >
      <svg>
        <g>
          <g>
            {derivedData.map((d, index) => (
              <ParallelAxisChartLine
                key={`ArcParallelAxisChartLine-${index}`}
                derivedDatum={d}
                className={cn(
                  !doesDatumPassFilters(d.datum, filters) && 'filtered'
                )}
              />
            ))}
            {derivedColumns.map((derivedColumn, i) => {
              const { column, max, min, fractionalXPos } = derivedColumn;
              return (
                <ParallelAxisChartColumn
                  key={`parallel-axis-chart-column-${i}-${column.key}`}
                  columnDef={column}
                  fractionalXPos={fractionalXPos}
                  didUpdateFilterSlider={(v) =>
                    didUpdateFilterSlider(derivedColumn, v)
                  }
                  data={data}
                  max={max}
                  min={min}
                />
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
};
