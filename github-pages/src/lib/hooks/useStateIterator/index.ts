// dependencies
import { useState } from 'react';
import { throttle } from '@adam-sv/arc';

export function useStateIterator(throttleMs?: number): [number, () => void] {
  const [iteration, setIteration] = useState(1); // I just feel like it may behave differently at 0 than any other integer

  function iterator() {
    setIteration((iter) => iter + 1);
  }

  const _throttledIterator = throttle(iterator, throttleMs || 200);
  const throttledIterator = () => _throttledIterator(undefined);

  return [
    iteration,
    typeof throttleMs === 'number' ? throttledIterator : iterator,
  ];
}
