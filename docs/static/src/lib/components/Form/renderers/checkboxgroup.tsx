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

import type { JSX } from 'react';

export const handledMappings = ['checkboxgroup', 'checkbox'];
export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void
): JSX.Element {
  const componentProps = field.componentProps as ICheckboxGroupProps;
  const items =
    (getCurrentValue(field.id) as ICheckBoxGroupItem[]) || componentProps.items;

  return (
    <CheckboxGroup
      key={field.id}
      {...componentProps}
      onChange={(values: ICheckBoxGroupItem[]) => {
        updateField(field.id, values);
      }}
      items={items}
    />
  );
}
