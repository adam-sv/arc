// dependencies
import React from 'react';
// internals
import { cn } from '@adam-sv/arc';
import { MenuItem } from './MenuItem';
// style
import './style.css';
// types
import type { IMenuItem } from './types';

export interface IMenuListProps {
  className?: string;
  items: IMenuItem[],
}

export function MenuList(props: IMenuListProps) {
  return (
    <div className={cn("MenuList", props.className)}>
      {props.items.map((item: IMenuItem, index: number) =>
        <MenuItem item={item} key={index} />
      )}
    </div>
  );
}
