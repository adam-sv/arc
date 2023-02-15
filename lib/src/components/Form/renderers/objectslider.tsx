// dependencies
import React from 'react';
// internals
import {
  ObjectSlider,
  IObjectSliderProps,
  ObjectSliderOption,
} from '@adam-sv/arc';
// types
import type { FormField } from '@adam-sv/arc';
import { FormFieldId, FormFieldValue } from '..';

export const handledMappings = ['objectslider'];
export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void,
  lifecycleKey: string
): JSX.Element {
  const props = field.componentProps as IObjectSliderProps<unknown>;
  const value = getCurrentValue(field.id) as string;

  return (
    <ObjectSlider
      key={`${lifecycleKey}-${field.id}`}
      {...props}
      onChange={(selectedOption: ObjectSliderOption<unknown>) =>
        updateField(field.id, selectedOption.value)
      }
      value={value}
    />
  );
}
