import React, { useRef } from 'react';
import { Button, Panel } from '@adam-sv/arc';
import './style.scss';

export default function ButtonsUsingRef() {
  const ref = useRef<HTMLButtonElement>(null);

  console.log('UsingRef found ref:', { ref });

  return (
    <div className='flex-column'>
      <Button className='MyClassName' arcRef={ref}>
        My Button - Check Console for Ref
      </Button>
    </div>
  );
}
