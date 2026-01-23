// dependencies
import React, { useLayoutEffect, useMemo, useState } from 'react';
// internal
import { cn, InputSkeleton } from '@adam-sv/arc';
import { extractSkeletonProps, InputValue } from '@adam-sv/arc';
import type { IInputPropsBase } from '@adam-sv/arc';
import { v4 as uuidv4 } from 'uuid';

export interface IColorInputProps extends IInputPropsBase<HTMLInputElement> {
  showSwatch?: boolean;
  value?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export function ColorInput(props: IColorInputProps) {
  const { inputRef, skeletonRef } = props;
  const id = useMemo<string>(() => uuidv4(), []);
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
      className={cn('ArcColorInput', props.className)}
      labelHtmlFor={id}
      skeletonRef={skeletonRef}
    >
      <input
        id={id}
        value={value}
        type='color'
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
      />
    </InputSkeleton>
  );
}
