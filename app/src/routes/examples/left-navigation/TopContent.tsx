import React from 'react';
import { LeftNavigation } from '@adam-sv/arc';
import { items, bottomItems, style } from './items';
// style
import './style.scss';

export default (
  <div style={style}>
    <LeftNavigation
      items={items}
      bottomItems={bottomItems}
      topContent={(isOpen: boolean) => `Top${isOpen ? ' Content Is Open' : ''}`}
    />
  </div>
);
