// dependencies
import React from 'react';
// internals
import { Input } from '@adam-sv/arc';
// types
import type { IFormField, IInputProps, InputType } from '@adam-sv/arc';

export const handledMappings = ['text', 'textarea', 'password', 'integer', 'float'];
export function renderField(
  field: IFormField,
  getCurrentValue: (fieldName: string) => any,
  updateField: (fieldName: string, value: any) => void,
  lifecycleKey: string,
): JSX.Element {
  const props = field.componentProps as IInputProps;
  let value;
  if (typeof field.initialValue === 'string' || typeof field.initialValue === 'number') {
    value = field.initialValue as (number | string);
  }

  return <Input
    key={`${lifecycleKey}-${field.name}`}
    {...props}
    onChange={e => updateField(field.name, e.target.value)}
    type={field.type as InputType}
    value={value}
  />;
}
