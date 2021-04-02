import React from 'react';

import './style.css';

import { Button, Title } from '@adam-sv/arc';

interface IArcConfirmModalProps {
  text: string;
  title?: string;
  onConfirm: (..._: any) => any;
  onCancel: (..._: any) => any;
}

export const Confirm = ({
  title = 'Confirm',
  text,
  onConfirm,
  onCancel,
}: IArcConfirmModalProps) => (
  <div className="ArcConfirmModal">
    <Title className="ArcConfirmModal-title" text={title} />
    <div className="ArcConfirmModal-message">{text}</div>
    <div className="ArcConfirmModal-buttonRow">
      <Button onClick={onConfirm}>Yes</Button>
      <Button onClick={onCancel}>No</Button>
    </div>
  </div>
);
