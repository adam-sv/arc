// dependencies
import React from 'react';
// internals
import { Dropdown } from '@adam-sv/arc';
// types
import type { IDropdownProps, IFormField } from '@adam-sv/arc';

export const handledMappings = ['dropdown', 'multiselect'];
export function renderField(
  field: IFormField,
  getCurrentValue: (fieldName: string) => any,
  updateField: (fieldName: string, value: any) => void,
  lifecycleKey: string,
) {
  const props = field.componentProps as IDropdownProps;
  const selected = getCurrentValue(field.name);

  // TODO: determine how dropdowns should really behave
  return <Dropdown
    key={`${lifecycleKey}-${field.name}`}
    {...props}
    onChange={item => updateField(field.name, item)}
    selected={selected}
  />;
}
