import React, { useState } from 'react';
import { Modal, Button, Title, Panel } from '@adam-sv/arc';
import { getAppRootElement } from 'src/app';

export function PopoverExample(): JSX.Element {
  const [leftIsOpen, setLeftIsOpen] = useState<boolean>(false);
  const [rightIsOpen, setRightIsOpen] = useState<boolean>(false);

  return (
    <Panel>
      <Button onClick={() => setLeftIsOpen(true)}>Open Left Popover</Button>
      <Button onClick={() => setRightIsOpen(true)}>Open Right Popover</Button>
      <Modal
        anchor='left'
        isOpen={leftIsOpen}
        setIsOpen={setLeftIsOpen}
        portalTargetElement={getAppRootElement()}
      >
        <Title>Pass Left-type Content</Title>
        <div>Some left-oriented content.</div>
      </Modal>

      <Modal
        anchor='right'
        isOpen={rightIsOpen}
        setIsOpen={setRightIsOpen}
        portalTargetElement={getAppRootElement()}
      >
        <Title>Pass Right-type Content</Title>
        <div>Some right-oriented content.</div>
      </Modal>
    </Panel>
  );
}
