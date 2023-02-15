// dependencies
import React from 'react';
// internals
import { TemporalInput } from '@adam-sv/arc';
// types
import type { FormField, ITemporalInputProps } from '@adam-sv/arc';
import { FormFieldId, FormFieldValue } from '..';

export const handledMappings = [
  'date',
  'datetime',
  'time',
  'month',
  'week',
  'temporal',
];

export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void,
  lifecycleKey: string
): JSX.Element {
  const props = field.componentProps as ITemporalInputProps;
  const value = getCurrentValue(field.id) as string | undefined;

  return (
    <TemporalInput
      key={`${lifecycleKey}-${field.id}`}
      {...props}
      onChange={(val) => updateField(field.id, val)}
      value={value}
    />
  );
}
