// dependencies
import React from 'react';
// internals
import { cn, Button, Modal, Title, Panel } from '@adam-sv/arc';
// styles
import './style.scss';
// types
import type { IARCProps } from '@adam-sv/arc';

export interface IArcAlertModalProps extends IARCProps {
  text: string;
  title?: string;
  buttonText?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  portalTargetElement?: Element | null;
}

export const AlertModal = ({
  buttonText = 'Ok',
  className,
  id,
  isOpen,
  portalTargetElement,
  setIsOpen,
  style,
  text,
  title = 'Alert',
}: IArcAlertModalProps) => (
  <Modal
    className={cn('ArcAlertModal', className)}
    id={id}
    style={style}
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    portalTargetElement={portalTargetElement}
  >
    <Title>{title}</Title>
    <div className='ArcAlertModal-message'>{text}</div>
    <div className='ArcAlertModal-buttonRow'>
      <Button
        className='ArcAlertModal-button'
        onClick={() => {
          setIsOpen(false);
        }}
      >
        {buttonText}
      </Button>
    </div>
  </Modal>
);
