// dependencies
import React, { useLayoutEffect, useState } from 'react';
// internal
import {
  cn,
  extractSkeletonProps,
  InputSkeleton,
  MonoIcon,
} from '@adam-sv/arc';
// styles
import './style.scss';
// types
import type { InputValue } from '@adam-sv/arc';
import type { ITemporalInputProps } from './types';

export function TemporalInput(props: ITemporalInputProps) {
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
    >
      <input
        value={value}
        type={props.type || 'datetime'}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        placeholder={props.placeholder || props.label}
        onChange={(ev) => onChange(ev)}
        onKeyUp={props.onKeyUp}
        onKeyDown={props.onKeyDown}
        onSubmit={props.onSubmit}
      />
      {props.type === 'time' ? <MonoIcon.Clock /> : <MonoIcon.Calendar />}
    </InputSkeleton>
  );
}
