// dependencies
import * as React from 'react';
// types
import type { FormResourceState } from './types';

export function Toast({ state, message }: { state: FormResourceState; message: string }) {
  if (state === 'default') {
    return <div className='Toast hidden' />;
  }

  return <div className={`Toast ${state}`}>
    {message}
  </div>;
}
