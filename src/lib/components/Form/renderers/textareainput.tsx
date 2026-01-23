import type { FormField, ITextAreaInputProps } from '@adam-sv/arc';
import { FormFieldId, FormFieldValue } from '..';
import { TextAreaInput } from '@adam-sv/arc';
import type { JSX } from 'react';

export const handledMappings = ['textarea'];
export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void
): JSX.Element {
  const props = field.componentProps as ITextAreaInputProps;
  const value = getCurrentValue(field.id) as string | number | undefined;

  return (
    <TextAreaInput
      key={field.id}
      {...props}
      onChange={(val: string | number) => {
        updateField(field.id, val);
      }}
      type={field.type as 'textarea'}
      value={value}
      name={field.id || props.name}
    />
  );
}
