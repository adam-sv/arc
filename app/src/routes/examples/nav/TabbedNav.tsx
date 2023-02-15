import React, { useState } from 'react';
import { Nav, Panel } from '@adam-sv/arc';

export const TabbedNav = (): JSX.Element => {
  const [selectedId, setSelectedId] = useState('One');

  return (
    <Panel style={{ padding: 'unset' }}>
      <Nav
        labels={['One', 'Two', 'Three']}
        selectedId={selectedId}
        onChange={(item) => {
          console.info({ item });
          setSelectedId(item.id);
        }}
        className='toggle'
        tabMode
      />
      <div
        style={{
          height: 200,
          padding:
            'var(--ARC-sizing-verticalSpace) var(--ARC-sizing-horizontalSpace)',
          display: 'grid',
          placeContent: 'center',
        }}
      >
        Your tab: {selectedId}
      </div>
    </Panel>
  );
};
