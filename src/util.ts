export const generatePseudoRandomId = (): string => {
  return `${(new Date()).getTime()}-${Math.random()}`;
};

export const getRandomInt = (min: number, max: number): number => {
  max += 1; // we're using floor so to make max inclusive, we add 1;
  return Math.floor(Math.random() * (Math.abs(max - min)) + min);
};

export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout

  return async(...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise(resolve => {
      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(() => resolve(func(...args)), waitFor)
    })
}

export const throttle = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  const now = () => new Date().getTime()
  const resetStartTime = () => startTime = now()
  let timeout: any;
  let startTime: number = now() - waitFor

  return async(...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise((resolve) => {
      const timeLeft = (startTime + waitFor) - now()
      if (timeout) {
        clearTimeout(timeout)
      }
      if (startTime + waitFor <= now()) {
        resetStartTime()
        resolve(func(...args))
      } else {
        timeout = setTimeout(() => {
          resetStartTime()
          resolve(func(...args))
        }, timeLeft)
      }
    })
}
