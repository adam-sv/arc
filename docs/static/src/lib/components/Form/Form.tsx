// dependencies
// internals
import {
  shouldRenderDescription,
  shouldRenderLoaderFirst,
  shouldRenderTitle,
} from './helpers';
import { useFormLogic } from './logic';
import {
  renderControls,
  renderDescription,
  renderField,
  renderFormTitle,
  renderLoader,
} from './renderers';
// styles
import './style.scss';
// types
import type {
  FormResourceState,
  FormRow,
  IFormProps,
  IFormSectionTitle,
  FormValues,
  FormFieldId,
  FormField,
} from './types';
import type { JSX } from 'react';

export interface IFormState {
  arcFormData: FormValues;
  resourceState: FormResourceState;
  userMessage: string;
  loaderProps: any;
}

export function Form(props: IFormProps): JSX.Element {
  const { onBlurField, onFocusField, submitButtonText, cancelButtonText } =
    props;
  const {
    className,
    onSubmit,
    state,
    formRows,
    formValues,
    updateField,
    clearChanges,
    editedFields,
  } = useFormLogic({ props });

  return (
    <form className={className} onSubmit={onSubmit} style={props.style}>
      {shouldRenderTitle(props) && renderFormTitle(props)}
      {shouldRenderLoaderFirst(props) && renderLoader(props, state)}
      {shouldRenderDescription(props) && renderDescription(props)}
      <div className='ArcForm-content'>
        {formRows.map((rowFields: FormRow, i: number) => (
          <div className='ArcForm-row' key={i}>
            {rowFields.map(
              (field: FormField | IFormSectionTitle, index: number) => {
                return (
                  <div
                    className='ArcForm-field-container'
                    key={index}
                    onFocus={(ev) => {
                      const f = field as FormField; // only fields can be focussed, so we can cast
                      const value = formValues.get(f.id);

                      if (onFocusField) onFocusField(f, value, ev);
                    }}
                    onBlur={(ev) => {
                      const f = field as FormField; // only fields can be blurred, so we can cast
                      const value = formValues.get(f.id);
                      if (onBlurField) onBlurField(f, value, ev);
                    }}
                  >
                    {renderField(
                      field,
                      (formId: FormFieldId) => formValues.get(formId),
                      updateField
                    )}
                  </div>
                );
              }
            )}
          </div>
        ))}
      </div>
      {!shouldRenderLoaderFirst(props) && renderLoader(props, state)}
      {renderControls(
        clearChanges,
        props.alwaysAllowFormSubmit ?? editedFields.size > 0,
        submitButtonText,
        cancelButtonText
      )}
    </form>
  );
}
