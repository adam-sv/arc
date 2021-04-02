import type { ArcComponentSize, IARCProps, RenderableContent } from '@adam-sv/arc';

export interface IDropdownItem<T = any> {
  label: string | number;
  value: T;
}

export interface IDropdownProps<T = any> extends IARCProps {
  items: IDropdownItem<T>[];
  label?: string;
  labelFor?: string;
  error?: string;
  onChange: (item: IDropdownItem<T>) => void;
  placeholder?: string;
  selected?: IDropdownItem<T> | null;
  info?: RenderableContent;
  componentSize?: ArcComponentSize;
}
