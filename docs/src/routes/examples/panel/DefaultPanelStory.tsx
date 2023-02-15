import React from 'react';
import { Panel } from '@adam-sv/arc';

export function DefaultPanelStory(): JSX.Element {
  return (
    <>
      <Panel style={{ height: '40%' }}>Default Panel</Panel>
      <div style={{ height: '20%' }} />
      <Panel style={{ height: '40%', boxShadow: 'unset', padding: 'unset' }}>
        Panel with no padding / no box shadow
      </Panel>
    </>
  );
}
