// dependencies
import React from 'react';
// internals
import { TreeBrowser } from '@adam-sv/arc';
// types
import { FormField, ITreeBrowserProps, TreeNodeId } from '@adam-sv/arc';
import { FormFieldId, FormFieldValue } from '..';

export const handledMappings = ['treebrowser'];
export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void,
  lifecycleKey: string
): JSX.Element {
  const props = field.componentProps as ITreeBrowserProps<undefined>;
  const value = getCurrentValue(field.id) as TreeNodeId;

  return (
    <TreeBrowser
      key={`${lifecycleKey}-${field.id}`}
      {...props}
      onChange={(node) => (node ? updateField(field.id, node.id) : undefined)}
      selectedNodeId={value}
    />
  );
}
