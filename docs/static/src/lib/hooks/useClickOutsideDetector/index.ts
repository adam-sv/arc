import { RefObject, useEffect } from 'react';

export const useClickOutsideDetector = <T = HTMLElement>(
  ref: RefObject<T | null>,
  didClickOutside: (event: MouseEvent) => unknown
) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event: MouseEvent) => {
      const current = ref.current as HTMLElement | null;
      const target = event.target as Node | null;
      if (current && target && !current.contains(target)) {
        didClickOutside(event);
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, didClickOutside]);
};
