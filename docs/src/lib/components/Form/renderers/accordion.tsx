// dependencies
import React from 'react';
// internals
import { Accordion } from '@adam-sv/arc';
// types
import type {
  IFormAccordionProps,
  IFormAccordionSection,
  FormField,
  IFormSectionTitle,
  RenderableContent,
} from '@adam-sv/arc';
import { FormFieldId, FormFieldValue } from '../types';

export const handledMappings = ['accordion'];
export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => any,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void,
  lifecycleKey: string,
  renderFormComponent: (
    field: FormField | IFormSectionTitle,
    getCurrentValue: (fieldId: FormFieldId) => any,
    updateField: (fieldId: FormFieldId, value: FormFieldValue) => void,
    key: string
  ) => RenderableContent
): JSX.Element {
  const props = field.componentProps as IFormAccordionProps;

  const accordionItems = props.sections.map(
    (section: IFormAccordionSection, i: number) => {
      return {
        id: `${field.name || 'unnamed'}-${i}`,
        label: section.label,
        children: section.fields.map((field: FormField, j: number) => (
          <div className='ArcForm-row' key={`${lifecycleKey}-${i}-${j}`}>
            {renderFormComponent(
              field,
              getCurrentValue,
              updateField,
              `${lifecycleKey}-${i}-${j}`
            )}
          </div>
        )),
      };
    }
  );

  // TODO: determine how dropdowns should really behave
  return (
    <Accordion
      key={`${lifecycleKey}-${field.id}`}
      items={accordionItems}
      onlyOneItemCanBeExpanded
    />
  );
}
