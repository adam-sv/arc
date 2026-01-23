// dependencies
// internals
import { Accordion } from '@adam-sv/arc';
// types
import type {
  IFormAccordionProps,
  IFormAccordionSection,
  FormField,
} from '@adam-sv/arc';
import type { FormFieldId, FormFieldValue, IFormFieldRenderer } from '../types';

import type { JSX } from 'react';

export const handledMappings = ['accordion'];
export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => any,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void,
  renderFormComponent: IFormFieldRenderer
): JSX.Element {
  const props = field.componentProps as IFormAccordionProps;

  const accordionItems = props.sections.map(
    (section: IFormAccordionSection, i: number) => {
      return {
        id: `${field.name || 'unnamed'}-${i}`,
        label: section.label,
        children: section.fields.map((field: FormField, j: number) => (
          <div className='ArcForm-row' key={`${i}-${j}`}>
            {renderFormComponent(
              field,
              getCurrentValue,
              updateField,
              renderFormComponent
            )}
          </div>
        )),
      };
    }
  );

  return (
    <Accordion key={field.id} items={accordionItems} onlyOneItemCanBeExpanded />
  );
}
