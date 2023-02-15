import React, { useLayoutEffect, useRef, useState } from 'react';
import { cn } from '@adam-sv/arc';
import '../style.scss';
import { IARCProps, NumberUtils } from '@adam-sv/arc';

export interface IRangeSliderProps extends IARCProps {
  value?: [number, number];
  valueUnitLabel?: string;
  title: string;
  min?: number;
  max: number;
  interval?: number;
  disableSlider?: boolean;
  isVertical?: boolean;
  onChange?: (
    value: [number, number],
    event?:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLDivElement>
  ) => void;
}

export function RangeSlider(props: IRangeSliderProps): JSX.Element {
  const {
    className,
    max,
    id,
    interval,
    style,
    title,
    valueUnitLabel,
    onChange,
    isVertical,
  } = props;
  const propValue = props.value;
  const lowSliderInput = useRef<HTMLInputElement>(null);
  const highSliderInput = useRef<HTMLInputElement>(null);
  const min = props.min || 0;
  const [value, setValue] = useState<[number, number]>([0, 1]);

  useLayoutEffect(() => {
    const roundAndClamp = (
      num: number // rounds to valid number
    ) =>
      NumberUtils.clamp(
        NumberUtils.round(num, undefined, interval, min),
        NumberUtils.round(min, 'up', interval, min), // calculate min, based on interval
        NumberUtils.round(max, 'down', interval, min) // calculate max, based on interval
      );
    if (propValue && (propValue[0] !== value[0] || propValue[1] !== value[1])) {
      const roundedAndClampedLow = roundAndClamp(propValue[0]);
      const roundedAndClampedHigh = roundAndClamp(propValue[1]);
      const newVals: [number, number] = [
        roundedAndClampedLow,
        roundedAndClampedHigh,
      ];
      setValue(newVals);
      if (onChange) onChange(newVals);
    }
  }, [propValue, onChange, value, max, min, interval]);

  const onChangeLow = (
    newValue: number,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLDivElement>
  ) => {
    const newValues: [number, number] =
      newValue < value[1] ? [newValue, value[1]] : [value[1] - 1, value[1]];
    setValue(newValues);
    if (props.onChange) props.onChange(newValues, event);
  };

  const onChangeHigh = (
    newValue: number,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLDivElement>
  ) => {
    const newValues: [number, number] =
      newValue > value[0] ? [value[0], newValue] : [value[0], value[0] + 1];
    setValue(newValues);
    if (props.onChange) props.onChange(newValues, event);
  };

  return (
    <div
      className={cn(
        'ArcSlider ArcRangeSlider',
        className,
        isVertical && 'ArcSlider-vertical'
      )}
      id={id}
      style={style}
    >
      <div className='title-row'>
        <span>{title}</span>
        <span>
          {`${value[0]} - ${value[1]}`}
          {valueUnitLabel && ` ${valueUnitLabel}`}
        </span>
      </div>
      <div className='slider-and-labels'>
        <div className='min-max-block'>
          <span>{min || 0}</span>
          <span>{max}</span>
        </div>
        <div className='slider-sizing-wrapper'>
          <div
            className='slider two-handles'
            role='group'
            aria-labelledby='title-row'
            style={
              {
                '--a': value[0],
                '--b': value[1],
                '--min': min,
                '--max': max,
              } as React.CSSProperties
            }
            onMouseDown={(ev) => {
              const rect = ev.currentTarget.getBoundingClientRect();
              const total = isVertical ? rect.height : rect.width;
              const progress = isVertical
                ? ev.clientY - rect.y
                : ev.clientX - rect.x;
              const clickedValuePercentage = isVertical
                ? 1 - progress / total
                : progress / total;
              const clickedValueExact =
                clickedValuePercentage * (max - min) + min;
              const clickedValueRoundedToInterval = NumberUtils.round(
                clickedValueExact,
                'closest',
                interval,
                min
              );
              const minValue = NumberUtils.round(min, 'up', interval, min);
              const maxValue = NumberUtils.round(max, 'down', interval, min);
              const clickedValueClampedAndRounded = NumberUtils.clamp(
                clickedValueRoundedToInterval,
                minValue,
                maxValue
              );
              const lowDiff = Math.abs(clickedValueExact - value[0]);
              const highDiff = Math.abs(clickedValueExact - value[1]);

              if (lowDiff < highDiff) {
                lowSliderInput.current?.focus();
                onChangeLow(clickedValueClampedAndRounded, ev);
              } else {
                highSliderInput.current?.focus();
                onChangeHigh(clickedValueClampedAndRounded, ev);
              }
            }}
          >
            <input
              type='range'
              ref={lowSliderInput}
              min={min}
              value={value[0]}
              max={max}
              step={interval}
              onChange={(ev) => onChangeLow(Number(ev.target.value), ev)}
            />
            <input
              type='range'
              ref={highSliderInput}
              min={min}
              value={value[1]}
              max={max}
              step={interval}
              onChange={(ev) => onChangeHigh(Number(ev.target.value), ev)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
