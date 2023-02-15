// dependencies
import React from 'react';
// internals
import { RangeSlider } from '@adam-sv/arc';
// types
import type { FormField, IRangeSliderProps } from '@adam-sv/arc';
import { FormFieldId, FormFieldValue } from '..';

export const handledMappings = ['rangeslider'];
export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void,
  lifecycleKey: string
): JSX.Element {
  const props = field.componentProps as IRangeSliderProps;
  const value = getCurrentValue(field.id) as [number, number];
  return (
    <RangeSlider
      key={`${lifecycleKey}-${field.id}`}
      {...props}
      value={value}
      onChange={(item: [number, number]) => updateField(field.id, item)}
    />
  );
}
