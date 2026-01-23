// internals
import { Dropdown } from '@adam-sv/arc';
// types
import type {
  FormFieldId,
  FormFieldValue,
  IDropdownProps,
  FormField,
  DropdownValue,
} from '@adam-sv/arc';

export const handledMappings = ['dropdown', 'multiselect'];
export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void
): React.JSX.Element {
  const props = field.componentProps as IDropdownProps;
  const currentValue = getCurrentValue(field.id) as DropdownValue;

  const placeholder =
    currentValue === undefined
      ? props.placeholder || 'Please make a selection'
      : undefined;

  return (
    <Dropdown
      key={field.id}
      {...props}
      onChange={(item) => {
        updateField(field.id, item.value);
      }}
      value={currentValue}
      placeholder={placeholder}
    />
  );
}
