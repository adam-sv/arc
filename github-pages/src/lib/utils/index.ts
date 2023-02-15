export { cn } from './cn';
export { composeFunctions } from './composeFunctions';
export { getIndexInArrayWithIds } from './getIndexInArrayWithIds';
export { getSizeClassName } from './getSizeClassName';
export { isArray } from './isArray';
export { mapToObj } from './mapToObj';
export { debounce, throttle } from './performance';
export {
  lightenDarkenColor,
  computeTextColorBasedOnBackground,
  hexToRgba,
} from './color';

import * as ColorUtils from './color';
import * as StringUtils from './string';
import * as NumberUtils from './number';
import * as ThemeUtils from './theme';
export { ColorUtils, StringUtils, NumberUtils, ThemeUtils };

export const THEMES = {
  DEFAULT: ThemeUtils.defaultTheme,
  DARK: ThemeUtils.darkTheme,
};

export const generatePseudoRandomId = (): string => {
  return `${(Math.random() + 1)
    .toString(36)
    .substring(2)}-${new Date().getTime()}`;
};

export const getRandomInt = (min: number, max: number): number => {
  max += 1; // we're using floor so to make max inclusive, we add 1;
  return Math.floor(Math.random() * Math.abs(max - min) + min);
};
