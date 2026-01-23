// internals
import { TemporalInput } from '@adam-sv/arc';
// types
import type {
  FormField,
  FormFieldId,
  FormFieldValue,
  ITemporalInputProps,
  TemporalInputType,
} from '@adam-sv/arc';
import type { JSX } from 'react';

export const handledMappings: TemporalInputType[] = [
  'date',
  'datetime-local',
  'time',
  'month',
  'week',
];

export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void
): JSX.Element {
  const props = field.componentProps as ITemporalInputProps;
  const value = getCurrentValue(field.id) as string | undefined;

  return (
    <TemporalInput
      key={field.id}
      {...props}
      onChange={(val) => {
        updateField(field.id, val);
      }}
      value={value}
    />
  );
}
