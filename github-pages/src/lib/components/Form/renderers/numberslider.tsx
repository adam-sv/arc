// dependencies
import React from 'react';
// internals
import { NumberSlider, INumberSliderProps } from '@adam-sv/arc';
// types
import type { FormField } from '@adam-sv/arc';
import { FormFieldId, FormFieldValue } from '..';

export const handledMappings = ['numberslider'];
export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void,
  lifecycleKey: string
): JSX.Element {
  const props = field.componentProps as INumberSliderProps;
  const value = getCurrentValue(field.id) as number;
  return (
    <NumberSlider
      key={`${lifecycleKey}-${field.id}`}
      {...props}
      value={value}
      onChange={(item) => updateField(field.id, item)}
    />
  );
}
