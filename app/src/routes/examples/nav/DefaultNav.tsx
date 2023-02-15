import React, { useState } from 'react';
import { Nav, Panel } from '@adam-sv/arc';

export const DefaultNav = (): JSX.Element => {
  const [selectedId, setSelectedId] = useState('One');

  return (
    <Panel>
      <Nav
        labels={['One', 'Two', 'Three']}
        selectedId={selectedId}
        onChange={(item) => {
          console.info({ item });
          setSelectedId(item.id);
        }}
        className='toggle'
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
        You have navigated to: {selectedId}
      </div>
    </Panel>
  );
};
