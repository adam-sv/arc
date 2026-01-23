import type {
  ArcComponentSize,
  IARCProps,
  RenderableContent,
} from '@adam-sv/arc';

export type DropdownValue =
  | number
  | string
  | Record<string, unknown>
  | Map<string | number, unknown>
  | boolean
  | undefined;

export interface IDropdownItem<T = DropdownValue> {
  label: string | number;
  value: T;
  disabled?: boolean;
}

export interface IDropdownProps<T = DropdownValue> extends IARCProps {
  /**
   * If value is undefined and placeholder is also undefined, it will set the value as the first item that is not disabled.
   *
   * @remarks
   * Value has no effect when a Dropdown is rendered within a Form.
   */
  value?: T;
  // items / selected
  items: IDropdownItem<T>[];
  onChange?: (item: IDropdownItem<T>) => unknown;
  // we will find the selected ObjectSliderOption by comparing props.value to each item's value
  // if === won't work because T is an object or another reason, provide custom props.equalityCheck
  equalityCheck?: (item1: T, item2: T) => boolean;
  // display logic
  label?: string;
  error?: string;
  labelFor?: string;
  placeholder?: string;
  componentSize?: ArcComponentSize;
  info?: RenderableContent;
  selectRef?: React.RefObject<HTMLSelectElement | null>;
  skeletonRef?: React.RefObject<HTMLDivElement | null>;
  disabled?: boolean;
}
