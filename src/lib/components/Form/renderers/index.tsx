// internals
import { Button, Title } from '@adam-sv/arc';
import { FormToast } from '../Toast';
// fields
import {
  handledMappings as accordionMappings,
  renderField as renderAccordion,
} from './accordion';
import {
  handledMappings as customMappings,
  renderField as renderCustom,
} from './custom';
import {
  handledMappings as checkboxGroupMappings,
  renderField as renderCheckboxGroup,
} from './checkboxgroup';
import {
  handledMappings as dropdownMappings,
  renderField as renderDropdown,
} from './dropdown';
import {
  handledMappings as objectListMappings,
  renderField as renderObjectList,
} from './objectlist';
import {
  handledMappings as listMappings,
  renderField as renderList,
} from './list';
import {
  handledMappings as numberSliderMappings,
  renderField as renderNumberSlider,
} from './numberslider';
import {
  handledMappings as rangeSliderMappings,
  renderField as renderRangeSlider,
} from './rangeslider';
import {
  handledMappings as objectSliderMappings,
  renderField as renderObjectSlider,
} from './objectslider';
import {
  handledMappings as textInputMappings,
  renderField as renderTextInput,
} from './textinput';

import {
  handledMappings as textAreaInputMappings,
  renderField as renderTextAreaInput,
} from './textareainput';
import {
  handledMappings as temporalInputMappings,
  renderField as renderTemporalInput,
} from './temporalinput';
import {
  handledMappings as autocompleteInputMappings,
  renderField as renderAutocompleteInput,
} from './autocomplete';
import {
  handledMappings as multitextInputMappings,
  renderField as renderMultitextInput,
} from './multitext';
import {
  handledMappings as treeBrowserMappings,
  renderField as renderTreeBrowser,
} from './treebrowser';
// types
import type {
  FormFieldId,
  FormFieldValue,
  FormFieldType,
  FormField,
  IFormProps,
  IFormSectionTitle,
  ITitleProps,
  RenderableContent,
  TemporalInputType,
} from '@adam-sv/arc';
import type { IFormState } from '../Form';
import { IFormFieldRenderer } from '../types';

const getRenderer = (type: FormFieldType): IFormFieldRenderer => {
  if (accordionMappings.includes(type)) return renderAccordion;
  if (customMappings.includes(type)) return renderCustom;
  if (dropdownMappings.includes(type)) return renderDropdown;
  if (textInputMappings.includes(type)) return renderTextInput;
  if (textAreaInputMappings.includes(type)) return renderTextAreaInput;
  if (temporalInputMappings.includes(type as TemporalInputType))
    return renderTemporalInput;
  if (objectListMappings.includes(type)) return renderObjectList;
  if (listMappings.includes(type)) return renderList;
  if (treeBrowserMappings.includes(type)) return renderTreeBrowser;
  if (autocompleteInputMappings.includes(type)) return renderAutocompleteInput;
  if (multitextInputMappings.includes(type)) return renderMultitextInput;
  if (checkboxGroupMappings.includes(type)) return renderCheckboxGroup;
  if (numberSliderMappings.includes(type)) return renderNumberSlider;
  if (rangeSliderMappings.includes(type)) return renderRangeSlider;
  if (objectSliderMappings.includes(type)) return renderObjectSlider;
  // default to custom
  return renderCustom;
};

// This is the one Accordion will recursively use?
export function renderField(
  field: FormField | IFormSectionTitle,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void
): RenderableContent {
  if ((field as FormField).type) {
    const formField = field as FormField;
    if (!formField.name) formField.name = formField.id; // default name to id
    try {
      const renderer = getRenderer(formField.type);
      return renderer(formField, getCurrentValue, updateField, renderField);
    } catch (e) {
      // TODO: make users able to pass their own values here,
      // instead of requiring a totally custom render to handle unknowns...
      console.error(
        'ArcForm did not have knowledge of how to render FormFieldType:',
        field,
        e
      );
      return null;
    }
  }

  return renderSectionTitle(field as IFormSectionTitle);
}

export const renderSectionTitle = (
  formSection: IFormSectionTitle
): RenderableContent => {
  const props = (formSection.titleComponentProps as ITitleProps) || {};

  return (
    <Title key={formSection.sectionTitle} {...props}>
      {formSection.sectionTitle}
    </Title>
  );
};

export const renderFormTitle = (props: IFormProps) => {
  if (!props.title) return null;

  const titleType = (props.renderOptions && props.renderOptions.titleType) || 3;
  return <Title titleType={titleType}>{props.title}</Title>;
};

export const renderDescription = (props: IFormProps) => {
  if (!props.description) return null;
  return <div className='ArcForm-description'>{props.description}</div>;
};

export const renderLoader = (props: IFormProps, state: IFormState) => {
  if (
    props.renderOptions &&
    props.renderOptions.renderCustomLoader &&
    props.renderOptions.customLoaderComponent
  ) {
    const CustomLoader = props.renderOptions.customLoaderComponent;
    const customLoaderProps = state.loaderProps || {};

    return (
      <CustomLoader
        state={state.resourceState}
        message={state.userMessage}
        {...customLoaderProps}
      />
    );
  }

  return (
    <div className='ArcForm-row'>
      <FormToast state={state.resourceState} message={state.userMessage} />
    </div>
  );
};

export const renderControls = (
  clearChanges: () => void,
  hasChanges: boolean,
  submitButtonText = 'Submit',
  clearButtonText = 'Clear Changes'
) => {
  return (
    <div className='ArcForm-controls'>
      <Button
        type='danger'
        disabled={!hasChanges}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          clearChanges();
        }}
      >
        {clearButtonText}
      </Button>
      <Button
        type='success'
        disabled={!hasChanges}
        // I think the event should bubble up and be caught by the Form - this is how it would work in HTML anyhow
        onClick={() => null}
        htmlType='submit'
      >
        {submitButtonText}
      </Button>
    </div>
  );
};
