// dependencies
import React from 'react';
// internals
import { CheckboxGroup } from '@adam-sv/arc';
// types
import type {
  FormFieldId,
  FormFieldValue,
  ICheckBoxGroupItem,
  ICheckboxGroupProps,
  FormField,
} from '@adam-sv/arc';

export const handledMappings = ['checkboxgroup', 'checkbox'];
export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void,
  lifecycleKey: string
): JSX.Element {
  const componentProps = field.componentProps as ICheckboxGroupProps;
  const items =
    (getCurrentValue(field.id) as ICheckBoxGroupItem[]) || componentProps.items;

  return (
    <CheckboxGroup
      key={`${lifecycleKey}-${field.id}`}
      {...componentProps}
      onChange={(values: ICheckBoxGroupItem[]) => updateField(field.id, values)}
      items={items}
    />
  );
}
