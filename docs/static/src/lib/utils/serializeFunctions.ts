// We allow the caller of serializeFunctions to use conditionals inline, such as:
// serializeFunctions(someCondition && myConditionHandler, someOtherCondition && myOtherConditionHandler)
// we produce a safe function then on their behalf
export type ARCMaybeFunction<
  T extends (...args: any) => any,
  U = any,
  V = any
> = ((...args: Parameters<T>) => U) | V;

export function serializeFunctions<
  T extends (...args: Array<any>) => U,
  U = any
>(
  ...functions: ARCMaybeFunction<T, U>[]
): (...args: Parameters<T>) => Array<U | undefined> {
  return function serializedFunctionCallsProvidedMethods(
    ...args: Parameters<T>
  ) {
    return functions.map((fn: ARCMaybeFunction<T, U>) => {
      if (typeof fn === 'function') {
        return fn(...args);
      }
    });
  };
}
