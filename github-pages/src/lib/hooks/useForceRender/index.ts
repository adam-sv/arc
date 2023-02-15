// dependencies
import { useCallback, useState } from 'react';

export function useForceRender(debugLog?: boolean) {
  // 1-indexing avoids any falsy issues, although it's true we never use this value..
  const [iteration, setIteration] = useState(1);

  const forceRender = useCallback(
    () => setIteration((iter) => iter + 1),
    [setIteration]
  );

  return forceRender;
}
