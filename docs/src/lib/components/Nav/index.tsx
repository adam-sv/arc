// dependencies
import React, { SyntheticEvent } from 'react';
// internals
import { cn } from '@adam-sv/arc';
// style
import './style.scss';
// types
import type { IARCProps } from '@adam-sv/arc';
import { RenderableContent } from '@adam-sv/arc';

export interface INavItem {
  id: string;
  label: RenderableContent;
}
export interface INavProps extends IARCProps {
  items?: INavItem[];
  labels?: string[];
  onChange: (item: INavItem) => void;
  selectedId: string;
  tabMode?: boolean;
}

export function Nav(props: INavProps) {
  let finalItems = [] as INavItem[];
  if (props.items) finalItems = props.items;
  else if (props.labels)
    finalItems = props.labels.map((label) => ({ id: label, label }));
  else throw new Error("INavProps must include 'items' or 'labels'");

  return (
    <div
      className={cn('ArcNav', props.className, props.tabMode && 'ArcNav-tabs')}
    >
      {finalItems.map((item) => (
        <NavItem
          key={item.id}
          onClick={props.onChange}
          item={item}
          selected={props.selectedId === item.id}
        />
      ))}
    </div>
  );
}

interface INavItemProps {
  item: INavItem;
  onClick: (item: INavItem) => void;
  selected: boolean;
}

function NavItem(props: INavItemProps) {
  return (
    <div
      className={cn('ArcNav-Item', props.selected && 'ArcNav-Item-selected')}
      onClick={(e: SyntheticEvent) => props.onClick(props.item)}
    >
      {props.item.label}
    </div>
  );
}
