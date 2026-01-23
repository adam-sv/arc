import React, { useEffect, useMemo, useState } from 'react';
import { cn, extractSkeletonProps, InputSkeleton } from '@adam-sv/arc';
import './style.scss';
import type { InputValue, IInputPropsBase } from '@adam-sv/arc';
import { v4 as uuidv4 } from 'uuid';

export interface ITextAreaInputProps
  extends IInputPropsBase<HTMLTextAreaElement> {
  rows?: number;
  cols?: number;
  from?: string;
  maxlength?: number;
  minlength?: number;
  inputRef?: React.RefObject<HTMLTextAreaElement | null>;
  spellcheck?: 'true' | 'default' | 'false';
  wrap?: 'hard' | 'soft' | 'off';
  type?: 'textarea';
}

export function TextAreaInput(props: ITextAreaInputProps) {
  const [value, setValue] = useState<InputValue>('');
  const inputId = useMemo(() => uuidv4(), []);
  const {
    rows,
    cols,
    min,
    max,
    type = 'textarea',
    onFocus,
    onBlur,
    onKeyDown,
    onSubmit,
    inputRef,
    onKeyUp,
    placeholder,
  } = props;

  const inputDisabled = props.readOnly || props.disabled;

  useEffect(() => {
    if (props.value !== undefined && value !== props.value) {
      setValue(props.value);
    }
  }, [props.value, value]);

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (props.onChange) props.onChange(newValue, event);
  };

  return (
    <InputSkeleton
      {...extractSkeletonProps(props)}
      className={cn('ArcTextInput', props.className)}
      labelHtmlFor={inputId}
      disabled={inputDisabled}
    >
      <textarea
        {...{
          rows,
          cols,
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
          onChange: handleTextAreaChange,
          disabled: inputDisabled,
          ref: inputRef,
          id: inputId,
        }}
      />
    </InputSkeleton>
  );
}
