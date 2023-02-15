// We allow the caller of composeFunctions to use conditionals inline, such as:
// composeFunctions(someCondition && myConditionHandler, someOtherCondition && myOtherConditionHandler)
// we produce a safe function then on their behalf
export type ARCMaybeFunction =
  | ((...args: any[]) => any)
  | boolean
  | undefined
  | unknown;

export function composeFunctions(...functions: ARCMaybeFunction[]) {
  return function composedFunction(...args: unknown[]) {
    functions.forEach((fn: ARCMaybeFunction) => {
      if (typeof fn === 'function') {
        fn(...args);
      }
    });
  };
}
