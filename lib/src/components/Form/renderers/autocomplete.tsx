// dependencies
import React from 'react';
// internals
import { AutocompleteInput } from '@adam-sv/arc';
// types
import type {
  FormFieldId,
  FormFieldValue,
  IAutocompleteInputProps,
  FormField,
  TextInputType,
} from '@adam-sv/arc';

export const handledMappings = ['autocomplete', 'typeahead'];
export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void,
  lifecycleKey: string
): JSX.Element {
  const props = field.componentProps as IAutocompleteInputProps;
  const value = getCurrentValue(field.id) as string | number | undefined;

  return (
    <AutocompleteInput
      key={`${lifecycleKey}-${field.id}`}
      {...props}
      onChange={(val) => updateField(field.id, val)}
      type={field.type as TextInputType}
      value={value}
      autocompleteSearch={props.autocompleteSearch}
    />
  );
}
