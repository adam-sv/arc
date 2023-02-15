import React, { useState } from 'react';
import { ConfirmModal } from '@adam-sv/arc';
import { getAppRootElement } from 'src/app';

const Confirm = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <div onClick={() => setIsOpen(true)}>Click Me!</div>
      <ConfirmModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        text={'Confirm this action?'}
        onConfirm={() => {
          console.info('Action was Confirmed by user');
        }}
        onCancel={() => {
          console.info('Action was Cancelled by user');
        }}
        portalTargetElement={getAppRootElement()}
      />
    </div>
  );
};

export default Confirm;
