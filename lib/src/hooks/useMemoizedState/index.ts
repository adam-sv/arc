// dependencies
import { useState } from 'react';
// typings
import type { IMemoizeOptions } from './types';
export type { IMemoizeOptions };

export function useMemoizedState<T>(
  initialValue: T,
  options: IMemoizeOptions<T>,
): [T | undefined, (value?: T) => void] {
  const [value, setter] = useState<T | undefined>(initialValue);

  function protectedSetter(nextValue?: T) {
    if (!nextValue && !options.updateWhenFalsy) return;
    if (value) {
      if (!nextValue) setter(undefined);
      else if (!options.equalityTest(value, nextValue)) setter(nextValue);
    } else if (nextValue) {
      if (!value) setter (nextValue);
      else if (!options.equalityTest(value, nextValue)) setter(nextValue);
    }
    // both value and next value are undefined, do nothing
  }

  return [value, protectedSetter];
}
