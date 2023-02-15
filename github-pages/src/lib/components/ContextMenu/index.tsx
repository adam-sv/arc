// dependencies
import React from 'react';
// internals
import { cn, MenuList, Modal } from '@adam-sv/arc';
// style
import './style.scss';
// types
import type { IARCProps, ICoords, IMenuListItem } from '@adam-sv/arc';

export interface IContextMenuProps extends IARCProps {
  // MenuList
  items: IMenuListItem[];
  // Modal
  isOpen: boolean;
  position: ICoords;
  setIsOpen: (isOpen: boolean) => void;
  portalTargetElement?: Element | null;
}

export function ContextMenu({
  className,
  items,
  position,
  isOpen,
  setIsOpen,
  portalTargetElement,
}: IContextMenuProps) {
  return (
    <Modal
      className={cn('ArcContextMenu', className)}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      backgroundProps={{
        className: 'ArcContextMenu-modalBackground',
      }}
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        transform: 'unset',
      }}
      portalTargetElement={portalTargetElement}
    >
      <MenuList items={items} />
    </Modal>
  );
}
