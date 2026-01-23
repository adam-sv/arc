import { isArray } from '@adam-sv/arc';
import type { FormRow, FormRows, FormValues } from '.';
import type {
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
  return layout.reduce<FormField[]>(
    (acc: FormField[], layoutItem: FormLayoutItem) => {
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
          ...(field.componentProps as IFormAccordionProps).sections.reduce<
            FormField[]
          >((accordionAcc: FormField[], section: IFormAccordionSection) => {
            return [
              ...accordionAcc,
              ...getFieldsFromLayoutItems(section.fields),
            ];
          }, []),
        ];
      }

      // otherwise, add the field
      return [...acc, layoutItem as FormField];
    },
    []
  );
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
  return props.renderOptions ? props.renderOptions.renderLoaderFirst : false;
};

export const shouldUseCustomRenderer = (props: IFormProps) => {
  return (
    props.renderOptions &&
    props.renderOptions.useCustomRenderBody &&
    typeof props.children === 'function'
  );
};

// When we get new props, we check if an "outside" source changes the data in the form field
// If they do, this will update the fields that were changed from "outside", thus keeping the Form up-to-date with external changes
export function comparePropValuesToInternalValuesAndUpdate(
  list: Array<FormField>,
  editedFields: Set<string>,
  formValues: FormValues,
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>
  // determineConflictStrategy?: () => 'keep-user-edit' | 'use-new-data',
) {
  const changesToApplyToFormValues: { fieldId: string; value: any }[] = [];
  // We wish to iterate over all the data fields
  // If the "props" has updated values - which is in our list above here - then we must decide what to do with htat update
  // If the user has edited that field, it will be in editedFields, which means we have a "conflict"
  // If the user hasn't edited that field, we should freely update it

  list.forEach((field) => {
    const defaultValue = field.initialValue || getEmptyValueForField(field);

    if (defaultValue === formValues.get(field.id)) return;
    if (editedFields.has(field.id)) {
      // TODO: determineConflictStrategy: this is a "conflict" between two data updates. On the one hand, the "user" has updated the field; on the other hand, a new server-side value became available for the field
      // Later, we should make it possible to use the "data" value instead of the "user" value, but for now always use "user" value
      return;
    }

    changesToApplyToFormValues.push({
      fieldId: field.id,
      value: defaultValue,
    });
  });

  // If you do call setFormValues, make sure you only do it when stuff is actually different, or it will infinite render
  if (changesToApplyToFormValues.length)
    setFormValues((last) => {
      changesToApplyToFormValues.forEach(({ fieldId, value }) =>
        last.set(fieldId, value)
      );
      return last;
    });
}

export function isCurrentValueEqualToInitialValue(
  field: FormField | undefined | null,
  value: any
) {
  if (!field) {
    return false;
  } else {
    if (
      isArrayWithAssertion(value) &&
      isArrayWithAssertion(field.initialValue)
    ) {
      compareArrays(value, field.initialValue);
    }
    return value === field.initialValue;
  }
}

function isArrayWithAssertion<T = any>(item?: T | T[]): item is T[] {
  if (!item) return false;
  if (typeof item !== 'object') return false;
  return 'forEach' in item && 'map' in item && 'length' in item;
}

// When these arrays are "primitive" only, we can use === and get back exactly the state
// When they are objects or classes, someone needs to provide a "deep equals" implementation
// TODO: We should add a prop?
function compareArrays(array1: any[], array2: any[]) {
  if (array1.every(primitiveTypeCheck) && array2.every(primitiveTypeCheck)) {
    if (array1.length !== array2.length) return false;
    for (let i = 0; i < array2.length; i++)
      if (array1[i] !== array2[i]) return false;

    return true;
  } else {
    // TODO figure out check for deep equals
    return false;
  }
}

function primitiveTypeCheck(element: any) {
  return typeof element !== 'object';
}
