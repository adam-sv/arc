// dependencies
import React, { useEffect, useRef, useState } from 'react';
// internals
import { cn, NumberUtils } from '@adam-sv/arc';
// style
import '../style.scss';
// types
import type { IARCProps } from '@adam-sv/arc';

export interface INumberSliderProps extends IARCProps {
  value?: number;
  valueUnitLabel?: string;
  valueUnitLabelSingular?: string;
  title: string;
  min?: number;
  max: number;
  disableSlider?: boolean;
  interval?: number;
  isVertical?: boolean;
  onChange?: (
    value: number,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLDivElement>
  ) => void;
}

export function NumberSlider(props: INumberSliderProps): JSX.Element {
  const {
    style,
    className,
    id,
    max,
    interval,
    title,
    valueUnitLabel,
    valueUnitLabelSingular,
    isVertical,
  } = props;
  const min = props.min || 0;
  const [value, setValue] = useState<number>(0);
  const sliderInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.value !== undefined && value !== props.value) {
      const roundedAndClamped = NumberUtils.clamp(
        NumberUtils.round(props.value, undefined, interval, min),
        NumberUtils.round(min, 'up', interval, min),
        NumberUtils.round(max, 'down', interval, max)
      );
      setValue(roundedAndClamped);
    }
  }, [props.value, value, interval, max, min]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
    if (props.onChange) props.onChange(newValue, event);
  };
  const unitLabel = // handle singular unit labels
    valueUnitLabel &&
    ` ${
      valueUnitLabelSingular && value === 1
        ? valueUnitLabelSingular
        : valueUnitLabel
    }`;

  return (
    <div
      className={cn(
        'ArcSlider ArcNumberSlider',
        className,
        isVertical && 'ArcSlider-vertical'
      )}
      id={id}
      style={style}
    >
      <div className='title-row'>
        <span>{title}</span>
        <span>
          {value}
          {unitLabel}
        </span>
      </div>
      <div className='slider-and-labels'>
        <div className='min-max-block'>
          <span>{min || 0}</span>
          <span>{max}</span>
        </div>
        <div className='slider-sizing-wrapper'>
          <div
            className='slider'
            role='group'
            aria-labelledby='title-row'
            style={
              {
                '--a': min,
                '--b': value,
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

              setValue(clickedValueClampedAndRounded);
              if (props.onChange)
                props.onChange(clickedValueClampedAndRounded, ev);
              sliderInput?.current?.focus();
            }}
          >
            <input
              type='range'
              min={min}
              value={value}
              max={max}
              step={interval}
              onChange={(ev) => onChange(ev)}
              ref={sliderInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
