import { isArray } from '@adam-sv/arc';
import { FormRow, FormRows } from '.';

import {
  FormFieldId,
  FormFieldValue,
  FormLayoutItem,
  IFormAccordionProps,
  IFormAccordionSection,
  FormField,
  IFormProps,
  IFormSectionTitle,
} from './types';

export const getFieldsFromLayoutItems = (
  layout: FormLayoutItem[]
): FormField[] => {
  return layout.reduce((acc: FormField[], layoutItem: FormLayoutItem) => {
    // if its an array of layout items, recursively process
    if (isArray(layoutItem)) {
      return [...acc, ...getFieldsFromLayoutItems(layoutItem as FormField[])];
    }
    // if its a sectionTitle, skip
    if ((layoutItem as IFormSectionTitle).sectionTitle) return acc;

    // field is a singular field
    const field = layoutItem as FormField;

    // if its an singular accordion, recursively process
    if (field.type === 'accordion') {
      return [
        ...acc,
        ...(field.componentProps as IFormAccordionProps).sections.reduce(
          (accordionAcc: FormField[], section: IFormAccordionSection) => {
            return [
              ...accordionAcc,
              ...getFieldsFromLayoutItems(section.fields),
            ];
          },
          [] as FormField[]
        ),
      ];
    }

    // otherwise, add the field
    return [...acc, layoutItem as FormField];
  }, [] as FormField[]);
};

export const getDefaultFormValues = (props: IFormProps) => {
  const formValues = new Map<FormFieldId, FormFieldValue>();
  getFieldsFromLayoutItems(props.layout).forEach((f: FormField) => {
    formValues.set(f.id, f.initialValue || getEmptyValueForField(f));
  });
  return formValues;
};

export const getEmptyValueForField = (field: FormField) => {
  if (
    field.type === 'text' ||
    field.type === 'textarea' ||
    field.type === 'password'
  ) {
    return '';
  }
  if (field.type === 'integer' || field.type === 'float') {
    return 0;
  }
  return undefined;
};

export const getFormRows = (props: IFormProps): FormRows => {
  return props.layout.map((layoutItem: FormLayoutItem) =>
    isArray(layoutItem) ? (layoutItem as FormRow) : ([layoutItem] as FormRow)
  );
};

export const shouldRenderTitle = (props: IFormProps) => {
  return Boolean(props.title);
};

export const shouldRenderDescription = (props: IFormProps) => {
  return Boolean(props.description);
};

export const shouldRenderLoaderFirst = (props: IFormProps) => {
  return props.renderOptions ? props.renderOptions?.renderLoaderFirst : false;
};

export const shouldUseCustomRenderer = (props: IFormProps) => {
  return (
    props.renderOptions &&
    props.renderOptions.useCustomRenderBody &&
    typeof props.children === 'function'
  );
};
