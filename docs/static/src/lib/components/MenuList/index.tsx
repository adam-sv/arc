// internals
import { cn } from '@adam-sv/arc';
// style
import './style.scss';
// types
import type { IARCProps, RenderableContent } from '@adam-sv/arc';

// TO-DO: => section, what are we doing with you?
export interface IMenuListItem extends IARCProps {
  icon?: RenderableContent;
  label: string;
  onClick?: (item: IMenuListItem) => void;
  section?: string;
}

export interface IMenuProps extends IARCProps {
  items: IMenuListItem[];
  onClick?: (item: IMenuListItem) => void;
}

export function MenuList(props: IMenuProps) {
  return (
    <ul className={cn('ArcMenuList', props.className)}>
      {props.items.map((item: IMenuListItem, i: number) => (
        <MenuItem
          className={item.className}
          key={i}
          label={item.label}
          onClick={item.onClick || props.onClick}
          icon={item.icon}
        />
      ))}
    </ul>
  );
}

export function MenuItem(props: IMenuListItem) {
  const { className, onClick, icon, label } = props;

  return (
    <li
      className={cn('ArcMenuItem', className)}
      onClick={() => {
        if (onClick) {
          onClick(props);
        }
      }}
    >
      {icon && <span className='ArcMenuItem-icon'>{icon}</span>}
      {label}
    </li>
  );
}
