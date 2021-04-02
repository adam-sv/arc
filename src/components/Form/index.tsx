// dependencies
import React, { SyntheticEvent, useState } from 'react';
import deepEqual from 'deep-equal';
// internals
import { Button, cn, getSizeClassName, isArray, mapToObj, Title, useStateIterator } from '@adam-sv/arc';
// styles
import './style.css';
// types
import type { TitleType } from '@adam-sv/arc';
import type { IFormCustomComponentProps } from './mappings/custom';
import type { FormFields, FormFieldType, FormResourceState, FormRow, FormRows, IFormAccordionSection, IFormAccordionProps, IFormField, IFormHooks, IFormObjectListProps, IFormProps, IFormRenderOptions, IFormSectionTitle, IFormState } from './types';
export type { FormFields, FormFieldType, FormResourceState, FormRow, FormRows, IFormAccordionSection, IFormAccordionProps, IFormCustomComponentProps, IFormField, IFormHooks, IFormObjectListProps, IFormProps, IFormRenderOptions, IFormSectionTitle, IFormState };
// subelements
import { renderField } from './mappings';
import { Toast } from './Toast';

export function Form(props: IFormProps): JSX.Element {
  const [childLifecycleKey, iterateChildLifecycleKey] = useStateIterator();
  const [arcFormData, setArcFormData] = useState<Map<string, any>>(getInitialFormValues(props));
  const [resourceState, setFormResourceState] = useState<FormResourceState>('default');
  const [userMessage, setLoadingMessage] = useState<string>('');
  const [loaderProps, setLoaderProps] = useState<any>({});

  const [hasChanges, setHasChanges] = useState(false);
  function clearChanges() {
    setArcFormData(getInitialFormValues(props));
    setHasChanges(false);
    iterateChildLifecycleKey();
  }

  const state = {
    arcFormData,
    resourceState,
    userMessage,
    loaderProps,
  };
  const hooks:IFormHooks = {
    setArcFormData,
    setFormResourceState,
    setLoadingMessage,
    setLoaderProps,
    clearChanges,
  };

  function onSubmitWithFormHooks(e?: SyntheticEvent) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    props.onSubmit(formatData(props, arcFormData), hooks);
  }
  function onChangeWithFormHooks() {
    if (props.onChange) {
      props.onChange(formatData(props, arcFormData));
    }
  }
  function getCurrentValue(fieldName: string): any {
    return arcFormData.get(fieldName);
  }
  function updateField(fieldName: string, value: any): void {
    if (arcFormData.has(fieldName) && arcFormData.get(fieldName) === value) {
      return;
    }

    arcFormData.set(fieldName, value);
    const updateHasChanges = !deepEqual(mapToObj(arcFormData), mapToObj(getInitialFormValues(props)));
    setHasChanges(updateHasChanges);
    setArcFormData(new Map(arcFormData));
    if (props.onChange) {
      onChangeWithFormHooks();
    }
  }

  const className = cn(
    !props.overrideDefaultClassName && 'ArcForm',
    props.tightPack && !props.airTightPack && 'ArcForm--tightPack',
    props.airTightPack && 'ArcForm--airTightPack',
    props.className,
    props.componentSize && getSizeClassName(props.componentSize),
    resourceState,
  );

  const formRows = getFormRows(props);
  if (shouldUseCustomRenderer(props)) {
    return props.children(formRows, hooks, className, props);
  }

  return (
    <form className={className} onSubmit={onSubmitWithFormHooks}>
      {shouldRenderTitle(props) && renderTitle(props)}
      {shouldRenderLoaderFirst(props) && renderLoader(props, state)}
      {shouldRenderDescription(props) && renderDescription(props)}
      <div className="ArcForm-content">
        {formRows.map((rowFields: FormRow, i: number) =>
          <div className="ArcForm-row" key={i}>
            {(rowFields as any[]).map((field: IFormField | IFormSectionTitle, j: number) =>
              renderField(field, getCurrentValue, updateField, `${childLifecycleKey}`)
            )}
          </div>
        )}
      </div>
      {!shouldRenderLoaderFirst(props) && renderLoader(props, state)}
      {renderControls(props, onSubmitWithFormHooks, clearChanges, hasChanges)}
    </form>
  );
}

function renderTitle(props: IFormProps) {
  if (!props.title) return null;

  const titleType = (props.renderOptions && props.renderOptions.titleType || 3);
  return <Title
    titleType={titleType as TitleType}
    text={props.title}
  />;
}

function renderDescription(props: IFormProps) {
  if (!props.description) return null;
  return <div className="ArcForm-description">{props.description}</div>;
}

function renderLoader(props: IFormProps, state: any) {
  if (
    props.renderOptions
    && props.renderOptions.renderCustomLoader
    && props.renderOptions.customLoaderComponent
  ) {
    const CustomLoader = props.renderOptions.customLoaderComponent;
    const customLoaderProps = state.loaderProps || {};

    return <CustomLoader
      state={state.resourceState}
      message={state.userMessage}
      {...customLoaderProps}
    />;
  }

  return (
    <div className="ArcForm-row">
      <Toast state={state.resourceState} message={state.userMessage} />
    </div>
  );
}

function renderControls(props: IFormProps, onSubmit: () => void, clearChanges: () => void, hasChanges: boolean) {
  return (
    <div className="ArcForm-controls">
      <Button
        type="success"
        text="Submit"
        disabled={!hasChanges}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onSubmit();
        }}
        htmlType="submit"
      />
      <Button
        type="danger"
        text="Clear Changes"
        disabled={!hasChanges}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          clearChanges();
        }}
      />
    </div>
  );
}

function getFormRows(props: IFormProps): FormRows {
  return props.fields.map((field: (IFormSectionTitle | IFormField | IFormField[])) =>
    isArray(field)
      ? field as FormRow
      : [field] as FormRow
  );
}

function shouldRenderTitle(props: IFormProps) {
  return Boolean(props.title);
}

function shouldRenderDescription(props: IFormProps) {
  return Boolean(props.description);
}

function shouldRenderLoaderFirst(props: IFormProps) {
  return props.renderOptions ? props.renderOptions?.renderLoaderFirst : false;
}

function shouldUseCustomRenderer(props: IFormProps) {
  return props.renderOptions && props.renderOptions.useCustomRenderBody && typeof props.children === 'function';
}

function getInitialFormValues(props: IFormProps) {
  const arcFormData = new Map();

  const trackFieldValue = (field) => {
    if (field.name && typeof field.name === 'string') {
      arcFormData.set(
        field.name,
        field.initialValue !== undefined
          ? field.initialValue
          : guessEmptyValue(field),
      );
    }
  }

  props.fields.forEach(field => {
    if (isArray(field)) {
      (field as IFormField[])
        .forEach(trackFieldValue);
    } else {
      trackFieldValue(field);
    }
  });

  return arcFormData;
}

function formatData(props: IFormProps, arcFormData: Map<string, any>): (FormData | object) {
  let consumerData: (FormData | object) = {};
  if (props.returnFormData) {
    consumerData = new FormData();
  }

  return Array
    .from(arcFormData.entries())
    .reduce((data, mapEntry) => {
      const [dataName, value] = mapEntry;
      const field = findField(dataName, props);

      // seems like a flaw of dropdowns that we have to do this...
      let returnValue = value;
      if (field && ['dropdown', 'multiselect'].indexOf(field.type) >= 0) {
        returnValue = value && value.value;
      }
      if (props.returnFormData) {
        (consumerData as FormData).set(dataName, returnValue);
      } else {
        (consumerData as object)[dataName] = returnValue;
      }
      return consumerData;
    }, consumerData);
}

function findField(dataName: string, props: IFormProps): IFormField | undefined {
  let fieldWithMatchingDataName;
  props.fields.forEach((field: (IFormField | IFormSectionTitle | IFormField[])) => {
    if (isArray(field)) {
      (field as IFormField[]).forEach((f: IFormField) => {
        if (f.name === dataName) {
         fieldWithMatchingDataName = f;
        }
      });
    } else if ((field as IFormField).name && (field as IFormField).name === dataName) {
      fieldWithMatchingDataName = field;
    }
  });
  return fieldWithMatchingDataName;
}

function guessEmptyValue(field: IFormField) {
  if (field.type === 'text' || field.type === 'textarea' || field.type === 'password') {
    return '';
  }
  if (field.type === 'integer' || field.type === 'float') {
    return 0;
  }
  return undefined;
}
