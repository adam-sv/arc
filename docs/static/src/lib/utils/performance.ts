export function debounce<T, U = void>(func: (arg: T) => U, waitFor: number) {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return async (arg: T): Promise<U> =>
    new Promise((resolve) => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        resolve(func(arg));
      }, waitFor);
    });
}

export function throttle<T extends Array<unknown>, U = void>(
  func: (...args: T) => U,
  waitFor: number
) {
  const now = () => new Date().getTime();
  const resetStartTime = () => (startTime = now());
  let timeout: NodeJS.Timeout | undefined = undefined;
  let startTime: number = now() - waitFor;

  return async (...args: T): Promise<U> =>
    new Promise((resolve) => {
      const timeLeft = startTime + waitFor - now();
      if (timeout) {
        clearTimeout(timeout);
      }
      if (startTime + waitFor <= now()) {
        resetStartTime();
        resolve(func(...args));
      } else {
        timeout = setTimeout(() => {
          resetStartTime();
          resolve(func(...args));
        }, timeLeft);
      }
    });
}

export const sleep = (ms: number): Promise<void> =>
  new Promise((r) => setTimeout(r, ms));
