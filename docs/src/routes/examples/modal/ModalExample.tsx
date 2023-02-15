import React, { useState } from 'react';
import { Modal, Button, Title } from '@adam-sv/arc';
import { getAppRootElement } from 'src/app';

export function ModalExample(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        portalTargetElement={getAppRootElement()}
      >
        <Title>Pass Any Content</Title>
        <div>
          It will render here, with padding & Panel/Surface style. Click outside
          the surface to close.
        </div>
      </Modal>
    </div>
  );
}
