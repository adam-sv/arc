// dependencies
import { useState } from 'react';
// types
export type StateIteratorAPI = [number, () => void]

export function useStateIterator(): StateIteratorAPI {
  const [iteration, setIteration] = useState(1); // I just feel like it may behave differently at 0 than any other integer

  function iterator() {
    setIteration(iteration + 1);
  }

  return [
    iteration,
    iterator,
  ];
}
