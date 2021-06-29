import type { ArcComponentSize, IARCProps, IDropdownProps, IInputProps, ITitleProps, ITreeBrowserProps, Optionalize, RenderableContent, TitleType } from '@adam-sv/arc';
import type { IButtonProps } from '@adam-sv/arc';

export type FormFieldType = (
  'text' | 'textarea' | 'password' | 'integer' | 'float'  // Input
  | 'dropdown' | 'multiselect'                            // Dropdown
  | 'accordion'                                           // Accordion
  | 'file'                                                // FileInput <does not exist>
  | 'treebrowser'                                         // TreeBrowser
  | 'objectlist'                                          // ObjectList
  | 'custom'                                              // Custom components <not yet integrated>
)
export type FormResourceState = (
  'default' | 'loading' | 'success' | 'error'
)

export interface IFormSectionTitle {
  section: string;
  label: string;
  titleComponentProps?: Optionalize<ITitleProps, { text: string }>;
}

export interface IFormField {
  section?: string,
  name: string; // this is the *name of the data field*
  initialValue?: any;
  type: FormFieldType;
  required?: boolean;
  component?: React.ElementType<any>;
  // Optionalize removes the union of the two types: Optionalize<{ test: string }, { test: string }> = { test?: string }
  // We use it here to optionalize the change handlers of each component type we render, since we will supply those
  componentProps?: Optionalize<IInputProps, { onChange: IInputProps["onChange"] }>
    | Optionalize<IDropdownProps, { onChange: IDropdownProps["onChange"] }>
    | Optionalize<ITreeBrowserProps, { onChange: ITreeBrowserProps["onChange"] }>
    | IFormAccordionProps
    | IFormObjectListProps
    | { label: string };
  customComponentProps?: any;
}

export interface IFormRenderOptions {
  customLoaderComponent?: RenderableContent | any;
  renderCustomLoader?: boolean;
  renderLoaderFirst?: boolean;
  titleType?: TitleType;
  useCustomRenderBody?: boolean;
}

export interface IFormHooks {
  setArcFormData: (arcFormData: Map<string, any>) => void;
  setFormResourceState: (resourceState: FormResourceState) => void;
  setLoadingMessage: (loadingMessage: string) => void;
  setLoaderProps: (loaderPropsCanBeForCustomLoader: any) => void;
  clearChanges: () => void;
}

export type FormFields = (IFormSectionTitle | IFormField | IFormField[])[];

export interface IFormProps extends IARCProps {
  title?: string;
  description?: string | RenderableContent;
  fields: FormFields;
  onChange?: (data: any) => void;
  onSubmit: (data: any, hooks: any) => void;
  renderOptions?: IFormRenderOptions;
  returnFormData?: boolean;
  componentSize?: ArcComponentSize;
  tightPack?: boolean;
  airTightPack?: boolean;
  children?: (formRows: FormRows, hooks: IFormHooks, className: string, props: IFormProps) => JSX.Element;
}

export interface IFormState {
  arcData: object;
  formData: FormData;
  resourceState: FormResourceState;
  userMessage: string;
  loaderProps: object;
}

// internal typings for render mapping
export type FormRow = IFormField[] | IFormSectionTitle[];
export type FormRows = FormRow[];

export interface IFormAccordionSection {
  label: RenderableContent;
  fields: IFormField[];
};
export interface IFormAccordionProps {
  sections: IFormAccordionSection[];
}

export interface IFormObjectListProps {
  fields: IFormField[];
  formatFieldBeforeRender?: (field: IFormField, listMember: any) => IFormField;
  itemLabel: string; // "Source" => items get title Source 0, Source 1, ...; null => no item title
  label: string;
  maxMembers?: number;
  newItemButtonProps: Optionalize<IButtonProps, { onClick: any }>;
}
