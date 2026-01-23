export { cn } from './cn';
export { serializeFunctions } from './serializeFunctions';
export { getSizeClassName } from './getSizeClassName';
export { isArray } from './isArray';
export { mapToObj } from './mapToObj';
export { debounce, throttle, sleep } from './performance';
export {
  lightenDarkenColor,
  computeTextColorBasedOnBackground,
  hexToRgba,
} from './color';

import * as ColorUtils from './color';
import * as StringUtils from './string';
import * as NumberUtils from './number';
import * as DateUtils from './date';
import * as ThemeUtils from './theme';
export { ColorUtils, StringUtils, NumberUtils, ThemeUtils, DateUtils };
import { v4 as uuidv4 } from 'uuid';

export const THEMES = {
  DEFAULT: ThemeUtils.defaultTheme,
  DARK: ThemeUtils.darkTheme,
};

export const generatePseudoRandomId = (): string => {
  return uuidv4();
};

// removes nullish values and strongly asserts the remaining array is of type T
export function filterOutFalsy<T = unknown>(
  n: T | undefined | null | false | ''
): n is T {
  return Boolean(n);
}
