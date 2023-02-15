import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@adam-sv/arc';
import '../style.scss';
import { IARCProps, NumberUtils } from '@adam-sv/arc';

export type ObjectSliderOption<T> = {
  value: T;
  label: string;
};

export interface IObjectSliderProps<T> extends IARCProps {
  disableSlider?: boolean;
  onChange?: (
    selectedOption: ObjectSliderOption<T>,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLDivElement>
  ) => void;
  options: ObjectSliderOption<T>[];
  title: string;
  // we will find the selected ObjectSliderOption by comparing props.value to each item's value
  // if === won't work because T is an object or another reason, provide custom props.equalityCheck
  equalityCheck?: (item1: T, item2: T) => boolean;
  value?: T;
  isVertical?: boolean;
}

export const ObjectSlider = <T,>({
  className,
  equalityCheck,
  id,
  onChange,
  options,
  value,
  style,
  title,
  isVertical,
}: IObjectSliderProps<T>): JSX.Element => {
  const max = options.length - 1;
  const sliderInput = useRef<HTMLInputElement>(null);

  const [selectedValue, setSelectedOption] = useState<T>(
    () => value || options[options.length - 1]?.value
  );

  const selectedValueIndex = options.findIndex((o) =>
    equalityCheck ? equalityCheck(o.value, selectedValue) : o.value === value
  );

  // EQUALITY TODO
  useEffect(() => {
    if (value !== undefined && selectedValue !== value) {
      setSelectedOption(value);
    }
  }, [value, selectedValue]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    const newOption = options[newValue];
    setSelectedOption(newOption.value);
    if (onChange) onChange(newOption, event);
  };

  const selectedOption = options[selectedValueIndex];

  return (
    <div
      className={cn(
        'ArcSlider ArcObjectSlider',
        className,
        isVertical && 'ArcSlider-vertical'
      )}
      id={id}
      style={style}
    >
      <div className='title-row'>
        <span>{title}</span>
        <span>{selectedOption?.label}</span>
      </div>
      <div className='slider-and-labels'>
        <div className='min-max-block'>
          <span>{options[0]?.label}</span>
          <span>{options[max]?.label}</span>
        </div>
        <div className='slider-sizing-wrapper'>
          <div
            className='slider'
            role='group'
            aria-labelledby='title-row'
            onMouseDown={(ev) => {
              const rect = ev.currentTarget.getBoundingClientRect();
              const total = isVertical ? rect.height : rect.width;
              const progress = isVertical
                ? ev.clientY - rect.y
                : ev.clientX - rect.x;
              const clickedValuePercentage = isVertical
                ? 1 - progress / total
                : progress / total;
              const roundedValue = NumberUtils.round(
                clickedValuePercentage * max
              );

              const newOption = options[roundedValue];
              setSelectedOption(newOption.value);
              if (onChange) onChange(newOption, ev);
              sliderInput?.current?.focus();
            }}
            style={
              {
                '--a': 0,
                '--b': selectedValueIndex,
                '--min': 0,
                '--max': max,
              } as React.CSSProperties
            }
          >
            <input
              type='range'
              min={0}
              value={selectedValueIndex}
              max={max}
              onChange={(ev) => handleOnChange(ev)}
              ref={sliderInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
