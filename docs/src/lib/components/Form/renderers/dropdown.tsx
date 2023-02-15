// dependencies
import React from 'react';
// internals
import { Dropdown } from '@adam-sv/arc';
// types
import type {
  FormFieldId,
  FormFieldValue,
  IDropdownProps,
  FormField,
} from '@adam-sv/arc';

export const handledMappings = ['dropdown', 'multiselect'];
export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void,
  lifecycleKey: string
): JSX.Element {
  const props = field.componentProps as IDropdownProps;
  const currentValue = getCurrentValue(field.id);

  return (
    <Dropdown
      key={`${lifecycleKey}-${field.id}`}
      {...props}
      onChange={(item) => updateField(field.id, item?.value)}
      value={currentValue}
    />
  );
}
