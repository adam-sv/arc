import { useEffect, useLayoutEffect, useState } from 'react';

export const useEffectWithPreviousValue = <T>(
  callback: (newValue: T, oldValue: T) => void,
  dependency: T,
  useEffectFn: typeof useEffect | typeof useLayoutEffect = useEffect,
  equalityFn: (a: T, b: T) => boolean = (a, b) => a === b
) => {
  const [previous, setPrevious] = useState<T>(dependency);
  useEffectFn(() => {
    if (!equalityFn(dependency, previous)) {
      // yes, there was a change!
      callback(dependency, previous);
      setPrevious(dependency);
    }
  }, [dependency, callback, previous, equalityFn]);
};
