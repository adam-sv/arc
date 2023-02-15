import React from 'react';
import { ColorInput } from '@adam-sv/arc';

export const DefaultColorInput = (): JSX.Element => {
  return (
    <ColorInput
      label='Color Picker'
      onChange={() => {
        console.info('On Change Called');
      }}
      info='Browser provided input[type="color"], wrapped in InputSkeleton'
    />
  );
};
