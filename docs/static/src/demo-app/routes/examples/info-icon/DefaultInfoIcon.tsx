import { InfoIcon, Panel } from '@adam-sv/arc';
import type { JSX } from 'react';

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
