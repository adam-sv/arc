// internals
import { AutocompleteInput } from '@adam-sv/arc';
// types
import type {
  FormFieldId,
  FormFieldValue,
  IAutocompleteInputProps,
  FormField,
} from '@adam-sv/arc';
import { SingleLineTextInputType } from '../../TextInput';

import type { JSX } from 'react';

export const handledMappings = ['autocomplete', 'typeahead'];
export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void
): JSX.Element {
  const props = field.componentProps as IAutocompleteInputProps;
  const value = getCurrentValue(field.id) as string | number | undefined;

  return (
    <AutocompleteInput
      key={field.id}
      {...props}
      onChange={(val) => {
        updateField(field.id, val);
      }}
      type={field.type as SingleLineTextInputType}
      value={value}
      autocompleteSearch={props.autocompleteSearch}
    />
  );
}
