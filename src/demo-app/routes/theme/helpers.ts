import { ColorUtils, StringUtils } from '@adam-sv/arc';

export const getInputTextColor = (bgColor: string): string =>
  ColorUtils.computeTextColorBasedOnBackground(bgColor, 'white', 'black');

export const getSanitizedColorInputValue = (
  colorValueString: string | undefined
): string =>
  StringUtils.stripNonHexidecimal(
    (colorValueString || '').toLowerCase().slice(0, 7)
  );

export const getInterpretedColorInputValue = (
  colorValueString: string | undefined
): string => {
  colorValueString = getSanitizedColorInputValue(colorValueString);
  if (colorValueString.length === 4) {
    // if the string is 4 chars long, the last char is interpreted as alpha
    // alpha isn't supported by native color picker, so disregard it    colorValueString = colorValueString.slice(0, 3);
    colorValueString = colorValueString.slice(0, 3);
  }

  if (colorValueString.length === 3) {
    // if the string is 3 chars long, each char is copied
    colorValueString =
      colorValueString.charAt(0) +
      colorValueString.charAt(0) +
      colorValueString.charAt(1) +
      colorValueString.charAt(1) +
      colorValueString.charAt(2) +
      colorValueString.charAt(2);
  }
  return `#${colorValueString}`;
};
