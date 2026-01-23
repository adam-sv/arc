// internals
import { TextInput } from '@adam-sv/arc';
// types
import type { FormField, ITextInputProps } from '@adam-sv/arc';
import { FormFieldId, FormFieldValue } from '..';
import { SingleLineTextInputType } from '../../TextInput';

export const handledMappings = ['text', 'password', 'integer', 'float'];

export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void
): React.JSX.Element {
  const props = field.componentProps as ITextInputProps;
  const value = getCurrentValue(field.id) as string | number | undefined;

  return (
    <TextInput
      key={field.id}
      {...props}
      onChange={(val: string | number) => {
        updateField(field.id, val);
      }}
      type={field.type as SingleLineTextInputType}
      value={value}
      name={field.id || props.name}
    />
  );
}
