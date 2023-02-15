import React from 'react';
import { MultitextInput } from '@adam-sv/arc';

export default (
  <MultitextInput
    onChange={(e, value) => {
      console.info({ e, value });
    }}
  />
);
