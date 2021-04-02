// dependencies
import { useState } from 'react';
// typings
import type { IMemoizeOptions } from './types';
export type { IMemoizeOptions };

export function useMemoizedState<T>(
  initialValue: T,
  options: IMemoizeOptions<T>,
): [T, (value: T) => void] {
  const [value, setter] = useState<T>(initialValue);

  function protectedSetter(nextValue?: T) {
    if (!nextValue && !options.updateWhenFalsy) {
      return;
    }
    if (!options.equalityTest(value, nextValue)) {
      setter(nextValue);
    }
  }

  return [value, protectedSetter];
}
