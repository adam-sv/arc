// dependencies
import React, { useLayoutEffect, useMemo, useState } from 'react';
// internal
import { cn, extractSkeletonProps, InputSkeleton, MatIcon } from '@adam-sv/arc';
// styles
import './style.scss';
// types
import type { InputValue, IInputPropsBase } from '@adam-sv/arc';
import type { RefObject } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type TemporalInputType =
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'month'
  | 'week';

export interface ITemporalInputProps extends IInputPropsBase<HTMLInputElement> {
  type?: TemporalInputType;
  min?: string;
  max?: string;
  value?: string; // date inputs value is always a string
  inputRef?: RefObject<HTMLInputElement | null>;
}

export function TemporalInput(props: ITemporalInputProps) {
  const { inputRef, name } = props;
  const inputId = useMemo(() => uuidv4(), []);
  const [value, setValue] = useState<InputValue>('');

  useLayoutEffect(() => {
    if (props.value !== undefined && value !== props.value) {
      setValue(props.value);
    }
  }, [props.value, value]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (props.onChange) props.onChange(newValue, event);
  };

  return (
    <InputSkeleton
      {...extractSkeletonProps(props)}
      className={cn('ArcTemporalInput', props.className)}
      labelHtmlFor={inputId}
    >
      <input
        name={name}
        value={value}
        type={props.type || 'datetime-local'}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        placeholder={props.placeholder || props.label}
        onChange={(ev) => {
          onChange(ev);
        }}
        onKeyUp={props.onKeyUp}
        onKeyDown={props.onKeyDown}
        onSubmit={props.onSubmit}
        ref={inputRef}
        id={inputId}
      />
      <div className='icon-wrapper'>
        {props.type === 'time' ? <MatIcon.Clock /> : <MatIcon.Calendar />}
      </div>
    </InputSkeleton>
  );
}
