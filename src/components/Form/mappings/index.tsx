// fields
import { handledMappings as accordionMappings, renderField as renderAccordion } from './accordion';
import { handledMappings as customMappings, renderField as renderCustom } from './custom';
import { handledMappings as dropdownMappings, renderField as renderDropdown } from './dropdown';
import { handledMappings as listMappings, renderField as renderList } from './objectlist';
import { handledMappings as inputMappings, renderField as renderInput } from './input';
import { handledMappings as treeBrowserMappings, renderField as renderTreeBrowser } from './treebrowser';
// section titles
import { renderTitle } from './title';
// types
import type { IFormField, IFormSectionTitle, RenderableContent } from '@adam-sv/arc';

const internalMap = {};
function attachRenderer(mappings: string[], renderer: any) {
  mappings.forEach(mapping =>
    internalMap[mapping] = renderer
  );
}
attachRenderer(accordionMappings, renderAccordion);
attachRenderer(customMappings, renderCustom);
attachRenderer(dropdownMappings, renderDropdown);
attachRenderer(inputMappings, renderInput);
attachRenderer(listMappings, renderList);
attachRenderer(treeBrowserMappings, renderTreeBrowser);

export function renderField(
  field: IFormField | IFormSectionTitle,
  getCurrentValue: (fieldName: string) => any,
  updateField: (fieldName: string, value: any) => void,
  key: string,
): RenderableContent {
  if ((field as IFormField).type) {
    const formField = field as IFormField;

    try {
      return internalMap[formField.type](formField, getCurrentValue, updateField, key, renderField);
    } catch (e) {
      // TODO: make users able to pass their own values here,
      // instead of requiring a totally custom render to handle unknowns...
      console.warn('ArcForm did not have knowledge of how to render FormFieldType:', field, e);
      return null;
    }
  }

  return renderTitle(field as IFormSectionTitle, key);
}
