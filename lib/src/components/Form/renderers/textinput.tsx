// dependencies
import React from 'react';
// internals
import { TextInput } from '@adam-sv/arc';
// types
import type { FormField, ITextInputProps, TextInputType } from '@adam-sv/arc';
import { FormFieldId, FormFieldValue } from '..';

export const handledMappings = [
  'text',
  'textarea',
  'password',
  'integer',
  'float',
];
export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void,
  lifecycleKey: string
): JSX.Element {
  const props = field.componentProps as ITextInputProps;
  const value = getCurrentValue(field.id) as string | number | undefined;

  return (
    <TextInput
      key={`${lifecycleKey}-${field.id}`}
      {...props}
      onChange={(val) => updateField(field.id, val)}
      type={field.type as TextInputType}
      value={value}
    />
  );
}
