// dependencies
// internals
import { GraphNodeId, TreeBrowser } from '@adam-sv/arc';
// types
import type {
  FormField,
  FormFieldId,
  FormFieldValue,
  ITreeBrowserProps,
} from '@adam-sv/arc';
import type { JSX } from 'react';

export const handledMappings = ['treebrowser'];
export function renderField<NodeType, NodeIdType extends GraphNodeId>(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void
): JSX.Element {
  // TODO, probably make this generic
  const props = field.componentProps as ITreeBrowserProps<NodeType, NodeIdType>;
  const value = getCurrentValue(field.id) as NodeIdType;

  return (
    <TreeBrowser
      key={field.id}
      {...props}
      onChange={(node) => {
        node ? updateField(field.id, node.id) : undefined;
      }}
      selectedNodeId={value}
    />
  );
}
