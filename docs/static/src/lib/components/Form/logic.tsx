import React, { useState, useCallback, useEffect } from 'react';
import { cn, getSizeClassName } from '@adam-sv/arc';
import {
  comparePropValuesToInternalValuesAndUpdate,
  getDefaultFormValues,
  isCurrentValueEqualToInitialValue,
  getFormRows,
  getFieldsFromLayoutItems,
} from './helpers';
import type {
  IFormProps,
  FormValues,
  FormResourceState,
  IFormHooks,
  FormFieldId,
  FormFieldValue,
} from './types';
import type { IFormState } from './Form';

export interface IFormLogic {
  props: IFormProps;
}
export const useFormLogic = ({ props }: IFormLogic) => {
  const { onChange } = props;
  const [editedFields, setEditedFields] = useState<Set<string>>(new Set());
  const [formValues, setFormValues] = useState<FormValues>(
    getDefaultFormValues(props)
  );
  const [resourceState, setFormResourceState] =
    useState<FormResourceState>('default');

  const [userMessage, setLoadingMessage] = useState<string>('');
  const [loaderProps, setLoaderProps] = useState<any>({});

  const layoutAsFieldList = getFieldsFromLayoutItems(props.layout);

  comparePropValuesToInternalValuesAndUpdate(
    layoutAsFieldList,
    editedFields,
    formValues,
    setFormValues
  );

  const clearChanges = useCallback(() => {
    const defaults = getDefaultFormValues(props);
    setFormValues(defaults);
    setEditedFields(new Set());
    // We pass no explicit changes, which is a big confusing but do users really care about this?
    if (onChange) onChange(defaults, hooks, []);
  }, [onChange]);

  useEffect(() => {
    clearChanges();
  }, []); // clear changes once after load'

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
    e.preventDefault();
    e.stopPropagation();
    if (props.onSubmit) props.onSubmit(formValues, hooks, e);
  };

  // We know some fields may be edited. We want to check that this field is or is not marked as edited after the user change
  const updateField = useCallback(
    (fieldId: FormFieldId, value: FormFieldValue): void => {
      const tempEditedFields = new Set(editedFields);
      const field = layoutAsFieldList.find((f) => f.id === fieldId);
      // Remove or add this field to the edited set as is appropriate
      if (
        formValues.has(fieldId) &&
        isCurrentValueEqualToInitialValue(field, value)
      ) {
        tempEditedFields.delete(fieldId);
        setEditedFields(tempEditedFields);
      } else if (!tempEditedFields.has(fieldId))
        setEditedFields(tempEditedFields.add(fieldId));

      formValues.set(fieldId, value);
      setFormValues(new Map(formValues));
      if (onChange) {
        const changes = Array.from(tempEditedFields);
        onChange(formValues, hooks, changes);
      }
    },
    [onChange, editedFields]
  );

  const className = cn(
    !props.overrideDefaultClassName && 'ArcForm',
    props.tightPack && !props.airTightPack && 'ArcForm--tightPack',
    props.airTightPack && 'ArcForm--airTightPack',
    props.className,
    props.componentSize && getSizeClassName(props.componentSize),
    resourceState
  );

  const formRows = getFormRows(props);

  return {
    className,
    onSubmit,
    state,
    formRows,
    formValues,
    updateField,
    clearChanges,
    editedFields,
  };
};
