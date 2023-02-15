// dependencies
import React from 'react';
// internals
import { MultitextInput } from '@adam-sv/arc';
// types
import type {
  FormFieldId,
  FormFieldValue,
  FormField,
  IMultitextInputProps,
  MultitextItem,
} from '@adam-sv/arc';

export const handledMappings = ['multitext', 'multitextinput'];
export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void,
  lifecycleKey: string
): JSX.Element {
  const props = field.componentProps as IMultitextInputProps;
  const items = getCurrentValue(field.id) as MultitextItem[];

  return (
    <MultitextInput
      key={`${lifecycleKey}-${field.id}`}
      {...props}
      itemsDidUpdate={(items: MultitextItem[]) => updateField(field.id, items)}
      type={'text'}
      items={items}
      autocompleteSearch={props.autocompleteSearch}
    />
  );
}
