import { LeftNavigation } from '@adam-sv/arc';
import React from 'react';
import { items, bottomItems, style } from './items';

export default (
  <div style={style}>
    <LeftNavigation items={items} bottomItems={bottomItems} />
  </div>
);
