import React, { useState } from 'react';
import { AlertModal, Button, Panel } from '@adam-sv/arc';
import { getAppRootElement } from 'src/app';

const Alert = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Panel>
      <Button type='success' onClick={() => setIsOpen(true)}>
        Click to Open Modal
      </Button>
      <AlertModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        text={'This Action caused an Alert!'}
        portalTargetElement={getAppRootElement()}
      />
    </Panel>
  );
};

export default Alert;
