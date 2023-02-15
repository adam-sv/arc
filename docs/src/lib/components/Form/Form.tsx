// dependencies
import React, { useEffect, useState } from 'react';
// internals
import { cn, getSizeClassName, useStateIterator } from '@adam-sv/arc';
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
  IFormHooks,
  IFormProps,
  IFormSectionTitle,
  FormValues,
  FormFieldValue,
  FormFieldId,
  FormField,
} from './types';

import {
  getDefaultFormValues,
  getFormRows,
  shouldRenderDescription,
  shouldRenderLoaderFirst,
  shouldRenderTitle,
  shouldUseCustomRenderer,
} from './helpers';

export interface IFormState {
  arcFormData: FormValues;
  resourceState: FormResourceState;
  userMessage: string;
  loaderProps: any;
}

export function Form(props: IFormProps): JSX.Element {
  const [childLifecycleKey, iterateChildLifecycleKey] = useStateIterator();
  const [formValues, setFormValues] = useState<FormValues>(
    getDefaultFormValues(props)
  );
  const [resourceState, setFormResourceState] =
    useState<FormResourceState>('default');
  const [userMessage, setLoadingMessage] = useState<string>('');
  const [loaderProps, setLoaderProps] = useState<any>({});
  const [hasChanges, setHasChanges] = useState(false);
  const { onBlurField, onChange, onFocusField } = props;
  const clearChanges = () => {
    const defaults = getDefaultFormValues(props);
    setFormValues(defaults);
    setHasChanges(false);
    if (onChange) onChange(defaults, hooks);
    iterateChildLifecycleKey();
  };

  useEffect(() => clearChanges(), []); // clear changes once after load

  const state: IFormState = {
    arcFormData: formValues,
    resourceState,
    userMessage,
    loaderProps,
  };

  const hooks: IFormHooks = {
    setFormValues,
    setFormResourceState,
    setLoadingMessage,
    setLoaderProps,
    clearChanges,
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (props.onSubmit) props.onSubmit(formValues, hooks, e);
  };

  const updateField = (fieldId: FormFieldId, value: FormFieldValue): void => {
    // if form value hasn't changed, do nothing
    if (formValues.has(fieldId) && formValues.get(fieldId) === value) return;
    formValues.set(fieldId, value);
    setFormValues(new Map(formValues));
    if (props.onChange) props.onChange(formValues, hooks);
    setHasChanges(true);
  };

  const className = cn(
    !props.overrideDefaultClassName && 'ArcForm',
    props.tightPack && !props.airTightPack && 'ArcForm--tightPack',
    props.airTightPack && 'ArcForm--airTightPack',
    props.className,
    props.componentSize && getSizeClassName(props.componentSize),
    resourceState
  );

  const formRows = getFormRows(props);
  // TODO: is this ever relevant? Why would it be?
  if (props?.children && shouldUseCustomRenderer(props)) {
    return props.children(formRows, hooks, className, props);
  }

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
                      // console.log('focus:', { f, value });
                      if (onFocusField) onFocusField(f, value, ev);
                    }}
                    onBlur={(ev) => {
                      const f = field as FormField; // only fields can be blurred, so we can cast
                      const value = formValues.get(f.id);
                      // console.log('blur:', { f, value });
                      if (onBlurField) onBlurField(f, value, ev);
                    }}
                  >
                    {renderField(
                      field,
                      (formId: FormFieldId) => formValues.get(formId),
                      updateField,
                      `${childLifecycleKey}`
                    )}
                  </div>
                );
              }
            )}
          </div>
        ))}
      </div>
      {!shouldRenderLoaderFirst(props) && renderLoader(props, state)}
      {renderControls(props, onSubmit, clearChanges, hasChanges)}
    </form>
  );
}
