import React, { useEffect, useMemo, useState } from 'react';
import { cn, extractSkeletonProps, InputSkeleton } from '@adam-sv/arc';
import './style.scss';
import type { InputValue, IInputPropsBase } from '@adam-sv/arc';
import { v4 as uuidv4 } from 'uuid';

export type SingleLineTextInputType = 'text' | 'password' | 'integer' | 'float';
export type TextInputType = 'text' | 'password' | 'integer' | 'float';

export interface ITextInputProps extends IInputPropsBase<HTMLInputElement> {
  type?: SingleLineTextInputType;
  value?: number | string;
  min?: number;
  max?: number;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export function TextInput(props: ITextInputProps) {
  const [value, setValue] = useState<InputValue>('');
  const inputId = useMemo(() => uuidv4(), []);
  const {
    min,
    max,
    type = 'text',
    onFocus,
    onBlur,
    onKeyDown,
    onSubmit,
    inputRef,
    onKeyUp,
    name,
    readOnly,
    disabled,
    className,
  } = props;

  const placeholder = props.placeholder || `Your ${props.type || 'text'}...`;
  const inputDisabled = readOnly || disabled;

  useEffect(() => {
    if (props.value !== undefined && value !== props.value) {
      setValue(props.value);
    }
  }, [props.value, value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = formatValue(event.target.value, type);
    setValue(newValue);
    if (props.onChange) props.onChange(newValue, event);
  };

  const inputProps = {
    min,
    max,
    type,
    value,
    onFocus,
    onBlur,
    onKeyDown,
    onSubmit,
    onKeyUp,
    placeholder,
    name,
    onChange: handleInputChange,
    ref: inputRef,
    readOnly,
    disabled: inputDisabled,
  };

  return (
    <InputSkeleton
      {...extractSkeletonProps(props)}
      className={cn('ArcTextInput', className)}
      labelHtmlFor={inputId}
      disabled={inputDisabled}
    >
      <input {...inputProps} id={inputId} />
    </InputSkeleton>
  );
}

const formatValue = (value: string, type: TextInputType) => {
  try {
    if (type === 'float' || type === 'integer') {
      const num = Number(value);

      if (isNaN(num)) {
        return value;
      }

      if (type === 'integer') {
        return Math.floor(num / 1);
      }

      return num;
    }

    return value;
  } catch (e) {
    console.error('Error formatting value:', e);
    return value;
  }
};
