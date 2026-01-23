import { useEffect } from 'react';

export const useScrollDetector = (
  didScrollCallback?: (ev?: Event) => unknown
) => {
  useEffect(() => {
    const onScroll = (ev: Event) => {
      if (didScrollCallback) didScrollCallback(ev);
    };
    window.addEventListener('scroll', onScroll, true);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [didScrollCallback]);
};
