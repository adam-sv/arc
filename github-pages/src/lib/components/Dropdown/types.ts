import type {
  ArcComponentSize,
  IARCProps,
  RenderableContent,
} from '@adam-sv/arc';

export type DropdownValue =
  | number
  | string
  | Record<string, any>
  | Map<string | number, any>
  | boolean;

export interface IDropdownItem<T = DropdownValue> {
  label: string | number;
  value: T;
  disabled?: boolean;
}

export interface IDropdownProps<T = DropdownValue> extends IARCProps {
  // items / selected
  items: IDropdownItem<T>[];
  onChange?: (item: IDropdownItem<T>) => void | undefined;
  // we will find the selected ObjectSliderOption by comparing props.value to each item's value
  // if === won't work because T is an object or another reason, provide custom props.equalityCheck
  equalityCheck?: (item1: T, item2: T) => boolean;
  value?: T;
  // display logic
  label?: string;
  error?: string;
  labelFor?: string;
  placeholder?: string;
  componentSize?: ArcComponentSize;
  info?: RenderableContent;
}
