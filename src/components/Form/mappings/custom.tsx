// dependencies
import React from 'react';
// types
import type { IFormField } from '@adam-sv/arc';

export interface IFormCustomComponentProps {
  field: IFormField;
  lifecycleKey: string;
  updateField: (fieldName: string, value: any) => void;
  value: any;
}

export const handledMappings = ['custom'];
export function renderField(
  field: IFormField,
  getCurrentValue: (fieldName: string) => any,
  updateField: (fieldName: string, value: any) => void,
  lifecycleKey: string,
) {
  const value = getCurrentValue(field.name);

  const CustomComponent = field.component;
  return <CustomComponent
    key={field.name}
    field={field}
    lifecycleKey={lifecycleKey}
    updateField={updateField}
    value={value}
  />;
}
