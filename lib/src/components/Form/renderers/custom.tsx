// dependencies
import React from 'react';
// types
import type { FormField } from '@adam-sv/arc';
import { FormFieldId, FormFieldValue } from '..';
import { IFormFieldCustom } from '../types';

export interface IFormCustomComponentProps<T = any> {
  field: FormField;
  lifecycleKey: string;
  updateField: (fieldName: string, value: T) => void;
  value: any;
}

export const handledMappings = ['custom'];
export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => any,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void,
  lifecycleKey: string
): JSX.Element {
  const value = getCurrentValue(field.id);

  // this is the only time we use FormField.component
  // if we want to change that type signature to be a function returning RenderableContent, that's fine
  // this gate will probably be required still because it'll be an optional property
  const CustomComponent = (field as IFormFieldCustom).component;
  if (!CustomComponent) {
    throw new Error('Pass a component');
  }

  return (
    <CustomComponent
      key={field.name}
      field={field}
      lifecycleKey={lifecycleKey}
      updateField={updateField}
      value={value}
    />
  );
}
