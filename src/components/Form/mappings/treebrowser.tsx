// dependencies
import React from 'react';
// internals
import { TreeBrowser } from '@adam-sv/arc';
// types
import { IFormField,  ITreeBrowserProps, TreeNodeId } from '@adam-sv/arc';

export const handledMappings = ['treebrowser'];
export function renderField(
  field: IFormField,
  getCurrentValue: (fieldName: string) => any,
  updateField: (fieldName: string, value: any) => void,
): JSX.Element {
  const props = field.componentProps as ITreeBrowserProps;

  let value;
  if (typeof field.initialValue === 'string' || typeof field.initialValue === 'number') {
    value = field.initialValue as TreeNodeId;
  } else if (field.initialValue && typeof field.initialValue === 'object' && field.initialValue.id !== undefined) {
    value = field.initialValue.id;
  }

  if (getCurrentValue(field.name)) {
    value = getCurrentValue(field.name);
  }

  return <TreeBrowser
    key={field.name}
    {...props}
    onChange={node => updateField(field.name, node.id)}
    selectedNodeId={value}
  />;
}
