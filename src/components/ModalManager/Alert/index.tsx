import React from 'react';

import './style.css';

import { Button, Title } from '@adam-sv/arc';

interface IArcAlertModalProps {
  text: string;
  title?: string;
  onDismiss: (..._: any) => any;
}

export const Alert = ({
  title = 'Alert',
  text,
  onDismiss,
}: IArcAlertModalProps) => (
  <div className="ArcAlertModal">
    <Title text={title} />
    <div className="ArcAlertModal-message">{text}</div>
    <div className="ArcAlertModal-buttonRow">
      <Button className="ArcAlertModal-button" onClick={onDismiss}>
        Ok
      </Button>
    </div>
  </div>
);
