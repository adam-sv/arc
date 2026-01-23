// types
import type { CSSProperties, JSX } from 'react';
import type {
  ArcComponentSize,
  GraphNodeId,
  IAutocompleteInputProps,
  IButtonProps,
  ICheckboxGroupProps,
  IDropdownProps,
  IFileInputProps,
  IMultitextInputProps,
  INumberSliderProps,
  IObjectSliderProps,
  IRangeSliderProps,
  ITemporalInputProps,
  ITextInputProps,
  ITitleProps,
  ITreeBrowserProps,
  RenderableContent,
  TemporalInputType,
  TitleType,
} from '@adam-sv/arc';
import type { IObjectListProps } from './renderers/objectlist';
import { ITextAreaInputProps } from '@adam-sv/arc';

export type JSONPrimitive = string | number | boolean | null;
export type JSONRecord = {
  [member: string]: JSONPrimitive | JSONArray | JSONRecord;
};
export type JSONArray = (JSONPrimitive | JSONArray | JSONRecord)[];
export type JSONSerializable = JSONPrimitive | JSONRecord | JSONArray;

export type FormFieldId = string;
export type FormFieldValue = any;
export type FormFieldType = string;
export type FormValues = Map<FormFieldId, FormFieldValue>;

export type FormResourceState = 'default' | 'loading' | 'success' | 'error';

export interface IFormAccordionProps {
  sections: IFormAccordionSection[];
}

export interface IFormAccordionSection {
  label: RenderableContent;
  fields: FormField[];
}

export interface IFormFieldAccordion extends IFormFieldBase {
  type: 'accordion';
  componentProps?: IFormAccordionProps;
}

export interface IFormSectionTitle {
  section: string;
  sectionTitle: string;
  titleComponentProps?: ITitleProps;
}

interface IFormFieldBase {
  id: FormFieldId;
  name?: string;
  section?: string;
  required?: boolean;
  initialValue?: FormFieldValue;
  componentProps?: Record<string, any>;
  type: FormFieldType;
}

export interface IFormFieldTextInput extends IFormFieldBase {
  type: 'text' | 'password' | 'integer' | 'float';
  initialValue?: ITextInputProps['value'];
  componentProps?: ITextInputProps;
}

export interface IFormFieldTextAreaInput extends IFormFieldBase {
  type: 'textarea';
  initialValue?: ITextAreaInputProps['value'];
  componentProps?: ITextAreaInputProps;
}

export interface IFormFieldMultitext extends IFormFieldBase {
  type: 'multitext';
  initialValue?: IMultitextInputProps['value'];
  componentProps?: IMultitextInputProps;
}

export interface IFormFieldAutocomplete extends IFormFieldBase {
  type: 'autocomplete' | 'typeahead';
  initialValue?: IAutocompleteInputProps['value'];
  componentProps?: IAutocompleteInputProps;
}

export interface IFormFieldDropdownInput<T> extends IFormFieldBase {
  /**
   * If no {@link IFormFieldDropdownInput.initialValue} is provided,
   * the Dropdown displays a placeholder.
   * The placeholder text is taken from `componentProps.placeholder` if set;
   * otherwise, a default placeholder is shown.
   * @see {@link IDropdownProps} for more details.
   */
  type: 'dropdown';
  initialValue?: T;
  componentProps?: IDropdownProps<T>;
}

export interface IFormFieldNumberSlider extends IFormFieldBase {
  type: 'numberslider';
  initialValue?: INumberSliderProps['value'];
  componentProps?: INumberSliderProps;
}

export interface IFormFieldObjectSlider<T> extends IFormFieldBase {
  type: 'objectslider';
  initialValue?: T;
  componentProps?: IObjectSliderProps<T>;
}

export interface IFormFieldRangeSlider extends IFormFieldBase {
  type: 'rangeslider';
  initialValue?: IRangeSliderProps['value'];
  componentProps?: IRangeSliderProps;
}

export interface IFormFieldCheckboxGroup extends IFormFieldBase {
  type: 'checkbox' | 'checkboxgroup' | 'multiselect';
  initialValue?: ICheckboxGroupProps['items'];
  componentProps?: ICheckboxGroupProps;
}

export interface IFormFieldObjectList extends IFormFieldBase {
  type: 'objectlist';
  initialValue?: IObjectListProps['values'];
  componentProps?: IObjectListProps;
}

export interface IFormFieldList<T> extends IFormFieldBase {
  type: 'list';
  initialValue?: T;
  componentProps: IFormListProps;
}

export interface IFormFieldTreeBrowser<NodeType, NodeIdType extends GraphNodeId>
  extends IFormFieldBase {
  type: 'treebrowser';
  initialValue?: ITreeBrowserProps<NodeType, NodeIdType>['value'];
  componentProps?: ITreeBrowserProps<NodeType, NodeIdType>;
}

export interface IFormFieldFileInput extends IFormFieldBase {
  type: 'file';
  initialValue?: undefined; // Ethan: this can change if its possible to preload a file?
  componentProps?: IFileInputProps;
}

export interface IFormFieldCustom extends IFormFieldBase {
  type: 'custom';
  component: any;
  customComponentProps: Record<string, any>;
}

export interface IFormFieldTemporalInput extends IFormFieldBase {
  type: TemporalInputType;
  initialValue?: string;
  componentProps?: ITemporalInputProps;
}

export type FormField<
  T = FormFieldValue,
  NodeIdType extends GraphNodeId = GraphNodeId,
> =
  | IFormFieldTextInput
  | IFormFieldTextAreaInput
  | IFormFieldDropdownInput<T>
  | IFormFieldAutocomplete
  | IFormFieldMultitext
  | IFormFieldAccordion
  | IFormFieldNumberSlider
  | IFormFieldObjectSlider<T>
  | IFormFieldRangeSlider
  | IFormFieldCheckboxGroup
  | IFormFieldObjectList
  | IFormFieldList<T>
  | IFormFieldTreeBrowser<T, NodeIdType>
  | IFormFieldFileInput
  | IFormFieldTemporalInput
  | IFormFieldCustom;

export interface IFormRenderOptions {
  customLoaderComponent?: RenderableContent | any;
  renderCustomLoader?: boolean;
  renderLoaderFirst?: boolean;
  titleType?: TitleType;
  useCustomRenderBody?: boolean;
}

export interface IFormHooks {
  setFormValues: (formValues: FormValues) => void;
  setFormResourceState: (resourceState: FormResourceState) => void;
  setLoadingMessage: (loadingMessage: string) => void;
  // this one is code smell, not sure this loader pattern is good
  // Investigate the [loaderProps, setLoaderProps] useState call to fix
  setLoaderProps: (loaderPropsCanBeForCustomLoader: any) => void;
  clearChanges: () => void;
}

export type FormLayoutItem<T = FormFieldValue> =
  | IFormSectionTitle
  | FormField<T>
  | FormField<T>[];

export interface IFormProps {
  title?: string;
  description?: string | RenderableContent;
  layout: FormLayoutItem[];
  // should we change the order below? What do we think will get used most?
  onChange?: (
    values: FormValues,
    hooks: IFormHooks,
    changedFields: string[]
  ) => void;
  onSubmit: (
    values: FormValues,
    hooks: IFormHooks,
    event?: React.FormEvent<HTMLFormElement>
  ) => void;
  onFocusField?: (
    field: FormFieldValue,
    value: FormFieldValue,
    event: React.FocusEvent<HTMLDivElement>
  ) => unknown;
  onBlurField?: (
    field: FormFieldValue,
    value: FormFieldValue,
    event: React.FocusEvent<HTMLDivElement>
  ) => unknown;
  renderOptions?: IFormRenderOptions;
  returnFormData?: boolean;
  componentSize?: ArcComponentSize;
  tightPack?: boolean;
  airTightPack?: boolean;
  children?: (
    formRows: FormRows,
    hooks: IFormHooks,
    className: string,
    props: IFormProps
  ) => JSX.Element;
  // Previously we used "extends IARCProps"
  className?: string;
  id?: string;
  overrideDefaultClassName?: boolean;
  style?: CSSProperties;
  alwaysAllowFormSubmit?: boolean;
  submitButtonText?: string;
  cancelButtonText?: string;
}

// internal typings for render mapping
export type FormRow = FormField[] | IFormSectionTitle[];
export type FormRows = FormRow[];

export interface IFormObjectListProps {
  fields: FormField[];
  formatFieldBeforeRender?: (field: FormField, listMember: any) => FormField;
  itemLabel: string; // "Source" => items get title Source 0, Source 1, ...; null => no item title
  label: string;
  maxMembers?: number;
  newItemButtonProps: IButtonProps;
}

export interface IFormListProps {
  field: FormField;
  itemLabel: string; // "Source" => items get title Source 0, Source 1, ...; null => no item title
  titleText: string;
  titleType: number;
  maxMembers?: number;
  newItemButtonProps: IButtonProps;
}

export type IFormFieldRenderer<T = FormField> = (
  field: T,
  getCurrentValue: (fieldId: FormFieldId) => any,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void,
  renderField: IFormFieldRenderer
) => RenderableContent;
