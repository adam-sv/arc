// internals
import {
  ObjectSlider,
  IObjectSliderProps,
  ObjectSliderOption,
} from '@adam-sv/arc';
// types
import type { FormField, FormFieldId, FormFieldValue } from '@adam-sv/arc';
import type { JSX } from 'react';

export const handledMappings = ['objectslider'];
export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void
): JSX.Element {
  const props = field.componentProps as IObjectSliderProps<unknown>;
  const value = getCurrentValue(field.id) as string;

  return (
    <ObjectSlider
      key={field.id}
      {...props}
      onChange={(selectedOption: ObjectSliderOption<unknown>) => {
        updateField(field.id, selectedOption.value);
      }}
      value={value}
    />
  );
}
