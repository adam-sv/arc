// dependencies
import React from 'react';
// style
import './style.css';
// types
import type { IMenuItem } from '../types';

export interface IMenuItemProps {
  item: IMenuItem;
}

export function MenuItem({ item }:IMenuItemProps) {
  const { icon, label, onClick, shortcut } = item;
  return (
    <div
      className="MenuItem"
      onClick={ev => onClick && onClick(ev, item)}
    >
      <Container className="icon-container" children={icon} />
      <Container className="label-container" children={label} />
      <Container className="shortcut-container" children={shortcut} />
    </div>
  );
}

function Container({ className, children }:{ className?: string, children?: any }) {
  if (!children) { return null; }
  return (
    <div className={className}>
      {children}
    </div>
  );
}
