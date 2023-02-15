export function debounce<T, U = void>(func: (arg: T) => U, waitFor: number) {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return async (arg: T): Promise<U> =>
    new Promise((resolve) => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => resolve(func(arg)), waitFor);
    });
}


export function throttle<T, U = void>(func: (arg: T) => U, waitFor: number) {
  const now = () => new Date().getTime();
  const resetStartTime = () => (startTime = now());
  let timeout: any;
  let startTime: number = now() - waitFor;

  return async (arg: T): Promise<U> =>
    new Promise((resolve) => {
      const timeLeft = startTime + waitFor - now();
      if (timeout) {
        clearTimeout(timeout);
      }
      if (startTime + waitFor <= now()) {
        resetStartTime();
        resolve(func(arg));
      } else {
        timeout = setTimeout(() => {
          resetStartTime();
          resolve(func(arg));
        }, timeLeft);
      }
    });
}
