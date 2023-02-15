import React from 'react';
import { InfoIcon, Panel } from '@adam-sv/arc';

export const DefaultInfoIcon = (): JSX.Element => {
  return (
    <Panel style={{ minHeight: 40 }}>
      <InfoIcon
        text={'Some Info!'}
        style={{ alignSelf: 'flex-end', justifySelf: 'center' }}
      />
    </Panel>
  );
};
