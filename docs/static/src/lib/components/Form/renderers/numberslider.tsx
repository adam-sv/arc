// dependencies
// internals
import { NumberSlider, INumberSliderProps } from '@adam-sv/arc';
// types
import type { FormField, FormFieldId, FormFieldValue } from '@adam-sv/arc';
import type { JSX } from 'react';

export const handledMappings = ['numberslider'];
export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void
): JSX.Element {
  const props = field.componentProps as INumberSliderProps;
  const value = getCurrentValue(field.id) as number;
  return (
    <NumberSlider
      key={field.id}
      {...props}
      value={value}
      onChange={(item) => {
        updateField(field.id, item);
      }}
    />
  );
}
