// dependenties
import React from 'react';
// internals
import { cn, Button, Modal, Title, Panel } from '@adam-sv/arc';
// style
import './style.scss';
// types
import type { IARCProps } from '@adam-sv/arc';

export interface IConfirmModalProps extends IARCProps {
  text: string;
  title?: string;
  confirmText?: string;
  rejectText?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => unknown;
  onCancel: () => unknown;
  portalTargetElement?: Element | null;
}

export const ConfirmModal = ({
  className,
  title = 'Confirm',
  confirmText = 'Yes',
  rejectText = 'No',
  text,
  isOpen,
  setIsOpen,
  onConfirm,
  onCancel,
  portalTargetElement,
}: IConfirmModalProps) => (
  <Modal
    className={cn('ArcConfirmModal', className)}
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    portalTargetElement={portalTargetElement}
  >
    <Title className='ArcConfirmModal-title'>{title}</Title>
    <div className='ArcConfirmModal-message'>{text}</div>
    <div className='ArcConfirmModal-buttonRow'>
      <Button
        type='danger'
        onClick={() => {
          onCancel();
          setIsOpen(false);
        }}
      >
        {rejectText}
      </Button>
      <Button
        type='success'
        onClick={() => {
          onConfirm();
          setIsOpen(false);
        }}
      >
        {confirmText}
      </Button>
    </div>
  </Modal>
);
