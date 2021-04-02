export type ARCMaybeFunction = Function | boolean | undefined | unknown;

export function composeFunctions(...functions: ARCMaybeFunction[]) {
  return function composedFunction(...args: unknown[]) {
    functions.forEach((fn: ARCMaybeFunction) => {
      if (typeof fn === 'function') {
        fn.apply(null, args);
      }
    });
  };
}
