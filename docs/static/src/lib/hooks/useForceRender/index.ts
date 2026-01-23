// dependencies
import { useCallback, useState } from 'react';

export function useForceRender(callbackWhenUsed?: () => unknown) {
  // 1-indexing avoids any falsy issues, although it's true we never use this value..
  const setIteration = useState(1)[1];

  const forceRender = useCallback(() => {
    callbackWhenUsed?.();
    setIteration((iter) => iter + 1);
  }, [setIteration]);

  return forceRender;
}
