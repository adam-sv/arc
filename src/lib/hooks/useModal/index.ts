// dependencies
import { useState } from 'react';
// types
import type { ModalHookAPI } from './types';
export type { ModalHookAPI };

export function useModal(): ModalHookAPI {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return [isShowing, setIsShowing, toggle];
}
