// dependencies
import React from 'react';
// internals
import { Accordion } from '@adam-sv/arc';
// types
import type { IFormAccordionProps, IFormAccordionSection, IFormField, IFormSectionTitle, RenderableContent } from '@adam-sv/arc';

export const handledMappings = ['accordion'];
export function renderField(
  field: IFormField,
  getCurrentValue: (fieldName: string) => any,
  updateField: (fieldName: string, value: any) => void,
  lifecycleKey: string,
  renderFormComponent: (
    field: IFormField | IFormSectionTitle,
    getCurrentValue: (fieldName: string) => any,
    updateField: (fieldName: string, value: any) => void,
    key: string,
  ) => RenderableContent,
) {
  const props = field.componentProps as IFormAccordionProps;
  
  const accordionItems = props.sections.map((section: IFormAccordionSection, i: number) => {
    return {
      id: `${field.name}-${i}`,
      label: section.label,
      children: section.fields.map((field: IFormField, j: number) =>
        <div className="ArcForm-row" key={`${lifecycleKey}-${i}-${j}`}>
          {renderFormComponent(field, getCurrentValue, updateField, `${lifecycleKey}-${i}-${j}`)}
        </div>
      ),
    };
  });

  // TODO: determine how dropdowns should really behave
  return <Accordion
    key={'solo-accordion'}
    items={accordionItems}
    onlyOneItemCanBeExpanded
  />;
}
