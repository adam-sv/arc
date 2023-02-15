// dependencies
import React from 'react';
// internals
import { cn } from '@adam-sv/arc';
// style
import './style.scss';
// types
import type { IARCProps, RenderableContent } from '@adam-sv/arc';

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
          key={i}
          label={item.label}
          onClick={item.onClick || props.onClick}
        />
      ))}
    </ul>
  );
}

export function MenuItem(props: IMenuListItem) {
  return (
    <li
      className={cn('ArcMenuItem', props.className)}
      onClick={(e) => props.onClick && props.onClick(props)}
    >
      {props.label}
    </li>
  );
}
