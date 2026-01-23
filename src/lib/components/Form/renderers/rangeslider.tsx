// internals
import { RangeSlider } from '@adam-sv/arc';
// types
import type {
  FormField,
  FormFieldId,
  FormFieldValue,
  IRangeSliderProps,
} from '@adam-sv/arc';
import type { JSX } from 'react';

export const handledMappings = ['rangeslider'];
export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void
): JSX.Element {
  const props = field.componentProps as IRangeSliderProps;
  const value = getCurrentValue(field.id) as [number, number];
  return (
    <RangeSlider
      key={field.id}
      {...props}
      value={value}
      onChange={(item: [number, number]) => {
        updateField(field.id, item);
      }}
    />
  );
}
