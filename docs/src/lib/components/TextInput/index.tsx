// dependencies
import React, { useEffect, useState } from 'react';
// internal
import { cn, extractSkeletonProps, InputSkeleton } from '@adam-sv/arc';
// styles
import './style.scss';
// types
import type { InputValue } from '@adam-sv/arc';

import type { IInputPropsBase } from '@adam-sv/arc';

export type TextInputType =
  | 'text'
  | 'textarea'
  | 'password'
  | 'integer'
  | 'float';

export interface ITextInputProps
  extends IInputPropsBase<HTMLInputElement | HTMLTextAreaElement> {
  type?: TextInputType;
  value?: string | number;
  min?: number;
  max?: number;
}

export function TextInput(props: ITextInputProps) {
  const [value, setValue] = useState<InputValue>('');

  useEffect(() => {
    if (props.value !== undefined && value !== props.value) {
      setValue(props.value);
    }
  }, [props.value, value]);

  const { Tag, ...rest } = getInputTypeProps(props);

  const handleKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // users want to make newlines in textareas, it's the whole point
    // COMMENT EDIT: but thats not what keyUp does...
    if (Tag === 'textarea') {
      return;
    }

    if (props.onKeyUp) {
      props.onKeyUp(event);
    }
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = formatValue(event.target.value, props);
    setValue(newValue);
    if (props.onChange) props.onChange(newValue, event);
  };

  return (
    <InputSkeleton
      {...extractSkeletonProps(props)}
      className={cn('ArcTextInput', props.className)}
    >
      <Tag
        {...rest}
        value={value}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        placeholder={
          props.placeholder
            ? props.placeholder
            : `Your ${`${props.type || 'text'}`?.toLowerCase()}...`
        }
        onChange={(ev) => onChange(ev)}
        onKeyUp={(ev) => handleKeyUp(ev)}
        onKeyDown={props.onKeyDown}
        onSubmit={props.onSubmit}
      />
    </InputSkeleton>
  );
}

const formatValue = (value: string, props: ITextInputProps) => {
  try {
    if (props.type === 'float' || props.type === 'integer') {
      const num = Number(value);

      if (isNaN(num)) {
        return value;
      }

      if (props.type === 'integer') {
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

interface IInputDerivedProps {
  Tag: 'input' | 'textarea';
  type: string;
  disabled?: boolean;
  step?: number;
  min?: number;
  max?: number;
}

const getInputTypeProps = (props: ITextInputProps): IInputDerivedProps => {
  const typeInformation: IInputDerivedProps = {
    Tag: 'input',
    type: 'text',
  };

  const type = props.type || 'text';

  if (type === 'textarea') {
    typeInformation.Tag = 'textarea';
  }

  if (['text', 'password'].indexOf(type) >= 0) {
    typeInformation.type = type;
  } else if (props.type === 'integer') {
    typeInformation.type = 'number';
    typeInformation.step = 1;

    if (typeof props.min === 'number') {
      typeInformation.min = props.min;
    }
    if (typeof props.max === 'number') {
      typeInformation.max = props.max;
    }
  } else if (props.type === 'float') {
    typeInformation.type = 'number';

    if (typeof props.min === 'number') {
      typeInformation.min = props.min;
    }

    if (typeof props.max === 'number') {
      typeInformation.max = props.max;
    }
  }

  return typeInformation;
};
