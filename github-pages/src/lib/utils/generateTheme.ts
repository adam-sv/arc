import {
  hexToRgba,
  lightenDarkenColor,
  computeTextColorBasedOnBackground,
  hexToRgbComponents,
  rgbToHex,
  rgbToHsv,
  hsvToRgb,
  RGBComponents,
} from './color';
import { capitalize } from './string';

const DEFAULT_COLORS = {
  darkIndigo: '#111e6c',
  dusk: '#4c516e',
  niceBlue: '#0f52ba',
  seafoam: '#26d1c1',
  robinsEgg: '#61e2fa',
  green: '#26d17b',
  orange: '#f87304',
  red: '#d44205',
  yellow: '#f8e71c',
  white: '#ffffff',
  black: '#000000',
  blue: '#017fff',
  light: '#f6f8fa',
  medium: '#9a9d9e',
  dark: '#414345',
};

export interface IThemeProps {
  background?: string;
  surface?: string;
  border?: string;
  light?: string;
  medium?: string;
  dark?: string;
  primary?: string;
  secondary?: string;
  tertiary?: string;
  danger?: string;
  warning?: string;
  success?: string;
}

export interface ITheme {
  background: string;
  surface: string;
  border: string;
  light: string;
  medium: string;
  dark: string;
  primary: string;
  secondary: string;
  tertiary: string;
  danger: string;
  warning: string;
  success: string;
}

interface IThemeColor {
  id: string;
  hex: string;
  rgba: string;
  components: string;

  // hover
  hover: string;
  hoverRgba: string;
  hoverComponents: string;

  // disabled
  disabled: string;
  disabledRgba: string;
  disabledComponents: string;

  // tint
  tint: string;
  tintRgba: string;
  tintComponents: string;

  // shade
  shade: string;
  shadeRgba: string;
  shadeComponents: string;

  // text
  text: string;
  textRgba: string;
  textComponents: string;
}

interface IThemeColors {
  background: IThemeColor;
  surface: IThemeColor;
  border: IThemeColor;
  light: IThemeColor;
  medium: IThemeColor;
  dark: IThemeColor;
  primary: IThemeColor;
  secondary: IThemeColor;
  tertiary: IThemeColor;
  danger: IThemeColor;
  warning: IThemeColor;
  success: IThemeColor;
}

/*
 *
 *  Theme Construction Functions
 *
 */

export const getThemeFromProps = (props: IThemeProps): ITheme => {
  let background = props.background || defaultTheme.background;
  if (background?.charAt(0) !== '#') background = `#${background}`;

  let surface = props.surface || defaultTheme.surface;
  if (surface?.charAt(0) !== '#') surface = `#${surface}`;

  let border = props.border || defaultTheme.border;
  if (border?.charAt(0) !== '#') border = `#${border}`;

  let primary = props.primary || defaultTheme.primary;
  if (primary?.charAt(0) !== '#') primary = `#${primary}`;

  let secondary = props.secondary || defaultTheme.secondary;
  if (secondary?.charAt(0) !== '#') secondary = `#${secondary}`;

  let tertiary = props.tertiary || defaultTheme.tertiary;
  if (tertiary?.charAt(0) !== '#') tertiary = `#${tertiary}`;

  let light = props.light || defaultTheme.light;
  if (light?.charAt(0) !== '#') light = `#${light}`;

  let medium = props.medium || defaultTheme.medium;
  if (medium?.charAt(0) !== '#') medium = `#${medium}`;

  let dark = props.dark || defaultTheme.dark;
  if (dark?.charAt(0) !== '#') dark = `#${dark}`;

  let danger = props.danger || defaultTheme.danger;
  if (danger?.charAt(0) !== '#') danger = `#${danger}`;

  let warning = props.warning || defaultTheme.warning;
  if (warning?.charAt(0) !== '#') warning = `#${warning}`;

  let success = props.success || defaultTheme.success;
  if (success?.charAt(0) !== '#') success = `#${success}`;

  return {
    background,
    surface,
    border,
    primary,
    secondary,
    tertiary,
    light,
    medium,
    dark,
    danger,
    warning,
    success,
  };
};

const getThemeColorsFromBase = (base: ITheme): IThemeColors => {
  return {
    background: getThemeColorForHex(
      base.background,
      'background',
      base.surface
    ),
    surface: getThemeColorForHex(base.surface, 'surface', base.surface),
    border: getThemeColorForHex(base.border, 'border', base.surface),
    primary: getThemeColorForHex(base.primary, 'primary', base.surface),
    secondary: getThemeColorForHex(base.secondary, 'secondary', base.surface),
    tertiary: getThemeColorForHex(base.tertiary, 'tertiary', base.surface),
    light: getThemeColorForHex(base.light, 'light', base.surface),
    medium: getThemeColorForHex(base.medium, 'medium', base.surface),
    dark: getThemeColorForHex(base.dark, 'dark', base.surface),
    danger: getThemeColorForHex(base.danger, 'danger', base.surface),
    warning: getThemeColorForHex(base.warning, 'warning', base.surface),
    success: getThemeColorForHex(base.success, 'success', base.surface),
  };
};

const getTint = (hex: string): string => lightenDarkenColor(hex, 0.1);
const getShade = (hex: string): string => lightenDarkenColor(hex, -0.1);
const getDisabled = (hex: string): string => {
  const rgb = hexToRgbComponents(hex);
  const hsv = rgbToHsv(rgb);
  hsv.s *= 0.3;
  const disabedRgb = hsvToRgb(hsv);
  return rgbToHex(disabedRgb);
  // const rgb = hexToRgbComponents(hex);
  // const whiteRgb = hexToRgbComponents('#ffffff');
  // const spectrumRgb = getColorOnSpectrum(rgb, whiteRgb, 0.5);
  // return rgbToHex(spectrumRgb);
};

const getThemeColorForHex = (
  hex: string,
  id: string,
  surfaceHex: string
): IThemeColor => {
  const lightContrast = DEFAULT_COLORS.white;
  const darkContrast = DEFAULT_COLORS.black;
  const contrast = computeTextColorBasedOnBackground(
    hex,
    lightContrast,
    darkContrast
  );
  const surfaceContrast = computeTextColorBasedOnBackground(
    surfaceHex,
    lightContrast,
    darkContrast
  );
  const tint = getTint(hex);
  const shade = getShade(hex);
  const disabled = getDisabled(hex);
  const hover = surfaceContrast === lightContrast ? tint : shade;
  const text = contrast;
  const getComponentString = (components: RGBComponents) =>
    `${components.r}, ${components.g}, ${components.b}`;
  return {
    id,

    // base
    hex,
    rgba: hexToRgba(hex, 1),
    components: getComponentString(hexToRgbComponents(hex)),

    // hover
    hover,
    hoverRgba: hexToRgba(hover),
    hoverComponents: getComponentString(hexToRgbComponents(hover)),

    // disabled
    disabled,
    disabledRgba: hexToRgba(disabled),
    disabledComponents: getComponentString(hexToRgbComponents(disabled)),

    // tint
    tint,
    tintRgba: hexToRgba(tint, 1),
    tintComponents: getComponentString(hexToRgbComponents(tint)),

    // shade
    shade,
    shadeRgba: hexToRgba(shade, 1),
    shadeComponents: getComponentString(hexToRgbComponents(shade)),

    // text
    text,
    textRgba: hexToRgba(text, 1),
    textComponents: getComponentString(hexToRgbComponents(text)),
  };
};

/*
 *
 *  Variable generators
 *
 */

export const generateQuickTheme = (
  primary: string,
  isDarkTheme: boolean
): ITheme => {
  const primaryRgb = hexToRgbComponents(primary);
  const primaryHsv = rgbToHsv(primaryRgb);

  const secondaryHueDiff = 30; // halfway to another colour
  let secondaryHue = primaryHsv.h + secondaryHueDiff;
  if (secondaryHue < 0) secondaryHue = 360 + secondaryHue;
  if (secondaryHue > 360) secondaryHue = secondaryHue - 360;
  const secondaryHsv = { ...primaryHsv, h: secondaryHue };

  const tertiaryHueDiff = -30; // halfway to another colour
  let tertiaryHue = primaryHsv.h + tertiaryHueDiff;
  if (tertiaryHue < 0) tertiaryHue = 360 + tertiaryHue;
  if (tertiaryHue > 360) tertiaryHue = tertiaryHue - 360;
  const tertiaryHex = { ...primaryHsv, h: tertiaryHue };

  const backgroundHsv = { h: primaryHsv.h, s: 5, v: isDarkTheme ? 20 : 92 };
  const surfaceHsv = { h: primaryHsv.h, s: 5, v: isDarkTheme ? 10 : 98 };
  const borderHsv = { h: primaryHsv.h, s: 5, v: isDarkTheme ? 30 : 75 };
  const dangerHsv = {
    s: Math.max(75, primaryHsv.s),
    h: 5 + (primaryHsv.h % 15),
    v: Math.max(40, primaryHsv.v),
  }; // Red: 0 - 20
  const successHsv = {
    s: Math.max(75, primaryHsv.s),
    h: 135 + (primaryHsv.h % 15),
    v: Math.max(40, primaryHsv.v),
  }; // Green: 120-160
  const warningHsv = {
    s: Math.max(75, primaryHsv.s),
    h: 20 + (primaryHsv.h % 15),
    v: Math.min(Math.max(40, primaryHsv.v * 1.1), 99), // orange needs a higher brightness
  }; // Orange: 20 - 50

  // greys
  const mediumHsv = { h: primaryHsv.h, s: 5, v: 50 };
  const lightHsv = { ...mediumHsv, v: isDarkTheme ? 20 : 85 };
  const darkHsv = { ...mediumHsv, v: isDarkTheme ? 85 : 20 };

  return {
    primary,
    secondary: rgbToHex(hsvToRgb(secondaryHsv)),
    tertiary: rgbToHex(hsvToRgb(tertiaryHex)),
    background: rgbToHex(hsvToRgb(backgroundHsv)),
    surface: rgbToHex(hsvToRgb(surfaceHsv)),
    border: rgbToHex(hsvToRgb(borderHsv)),
    light: rgbToHex(hsvToRgb(lightHsv)),
    dark: rgbToHex(hsvToRgb(darkHsv)),
    medium: rgbToHex(hsvToRgb(mediumHsv)),
    danger: rgbToHex(hsvToRgb(dangerHsv)),
    warning: rgbToHex(hsvToRgb(warningHsv)),
    success: rgbToHex(hsvToRgb(successHsv)),
  };
};

const lightQuickTheme = generateQuickTheme(DEFAULT_COLORS.niceBlue, false);
const darkQuickTheme = generateQuickTheme(DEFAULT_COLORS.niceBlue, true);
export const defaultTheme: ITheme = {
  ...lightQuickTheme,
  secondary: DEFAULT_COLORS.darkIndigo,
  tertiary: DEFAULT_COLORS.seafoam,
  danger: DEFAULT_COLORS.red,
  warning: DEFAULT_COLORS.orange,
  success: DEFAULT_COLORS.green,
};
export const darkTheme: ITheme = getThemeFromProps({
  ...darkQuickTheme,
  secondary: DEFAULT_COLORS.darkIndigo,
  tertiary: DEFAULT_COLORS.seafoam,
  danger: DEFAULT_COLORS.red,
  warning: DEFAULT_COLORS.orange,
  success: DEFAULT_COLORS.green,
});

const getVariablesStringForThemeColor = (themeColor: IThemeColor): string => {
  const {
    //base
    id,
    hex,
    rgba,

    // hover
    hover,
    hoverRgba,
    hoverComponents,

    // disabled
    disabled,
    disabledRgba,
    disabledComponents,

    // tint
    tint,
    tintRgba,
    tintComponents,

    // shade
    shade,
    shadeRgba,
    shadeComponents,

    // text
    text,
    textRgba,
    textComponents,

    components,
  } = themeColor;

  const capId = capitalize(id);

  const baseString = `
  /* ${capId} - Base */
  --${id}: ${hex};
  --${id}-rgba: ${rgba};
  --${id}-components: ${components};
  `;

  const hoverString = `
  /* ${capId} - Hover */
  --${id}-hover: ${hover};
  --${id}-hover-rgba: ${hoverRgba};
  --${id}-hover-components: ${hoverComponents};
  `;

  const disabledString = `
  /* ${capId} - Disabled */
  --${id}-disabled: ${disabled};
  --${id}-disabled-rgba: ${disabledRgba};
  --${id}-disabled-components: ${disabledComponents};
  `;

  const tintString = `
  /* ${capId} - Tint */
  --${id}-tint: ${tint};
  --${id}-tint-rgba: ${tintRgba};
  --${id}-tint-components: ${tintComponents};
  `;

  const shadeString = `
  /* ${capId} - Shade */
  --${id}-shade: ${shade};
  --${id}-shade-rgba: ${shadeRgba};
  --${id}-shade-components: ${shadeComponents};
  `;

  const textString = `
  /* ${capId} - Text */
  --${id}-text: ${text};
  --${id}-text-rgba: ${textRgba};
  --${id}-text-components: ${textComponents};
  `;

  const contrastString = `
  /* ${capId} - Contrast */
  --${id}-contrast: ${text};
  --${id}-contrast-rgba: ${textRgba};
  --${id}-contrast-components: ${textComponents};
  `;

  return `  /*
   *
   * ${capId}
   *
   */
  ${baseString}${hoverString}${disabledString}${tintString}${shadeString}${textString}${contrastString}
  `;
};

const getInlineVariablesForThemeColor = (
  themeColor: IThemeColor
): Record<string, string> => {
  const {
    //base
    id,
    hex,
    rgba,

    // hover
    hover,
    hoverRgba,
    hoverComponents,

    // disabled
    disabled,
    disabledRgba,
    disabledComponents,

    // tint
    tint,
    tintRgba,
    tintComponents,

    // shade
    shade,
    shadeRgba,
    shadeComponents,

    // text
    text,
    textRgba,
    textComponents,

    components,
  } = themeColor;
  const variables = {} as Record<string, any>;
  // base
  variables[`--${id}`] = `${hex}`;
  variables[`--${id}-rgba`] = `${rgba}`;
  variables[`--${id}-components`] = `${components}`;

  // hover
  variables[`--${id}-hover`] = `${hover}`;
  variables[`--${id}-hover-rgba`] = `${hoverRgba}`;
  variables[`--${id}-hover-components`] = `${hoverComponents}`;

  // disabled
  variables[`--${id}-disabled`] = `${disabled}`;
  variables[`--${id}-disabled-rgba`] = `${disabledRgba}`;
  variables[`--${id}-disabled-components`] = `${disabledComponents}`;

  // tint
  variables[`--${id}-tint`] = `${tint}`;
  variables[`--${id}-tint-rgba`] = `${tintRgba}`;
  variables[`--${id}-tint-components`] = `${tintComponents}`;

  // shade
  variables[`--${id}-shade`] = `${shade}`;
  variables[`--${id}-shade-rgba`] = `${shadeRgba}`;
  variables[`--${id}-shade-components`] = `${shadeComponents}`;

  // contrast
  variables[`--${id}-contrast`] = `${text}`;
  variables[`--${id}-contrast-rgba`] = `${textRgba}`;
  variables[`--${id}-contrast-components`] = `${textComponents}`;

  // text
  variables[`--${id}-text`] = `${text}`;
  variables[`--${id}-text-rgba`] = `${textRgba}`;
  variables[`--${id}-text-components`] = `${textComponents}`;
  return variables;
};

export const generateThemeInlineVariables = (
  themeProps: IThemeProps
): Record<string, string> => {
  const base = getThemeFromProps(themeProps);
  const themeColors = getThemeColorsFromBase(base);
  return {
    ...getInlineVariablesForThemeColor(themeColors.background),
    ...getInlineVariablesForThemeColor(themeColors.surface),
    ...getInlineVariablesForThemeColor(themeColors.border),
    ...getInlineVariablesForThemeColor(themeColors.primary),
    ...getInlineVariablesForThemeColor(themeColors.secondary),
    ...getInlineVariablesForThemeColor(themeColors.tertiary),
    ...getInlineVariablesForThemeColor(themeColors.light),
    ...getInlineVariablesForThemeColor(themeColors.medium),
    ...getInlineVariablesForThemeColor(themeColors.dark),
    ...getInlineVariablesForThemeColor(themeColors.danger),
    ...getInlineVariablesForThemeColor(themeColors.warning),
    ...getInlineVariablesForThemeColor(themeColors.success),
  };
};

export const generateThemeVariableString = (
  themeProps: IThemeProps
): string => {
  const base = getThemeFromProps(themeProps);
  const themeColors = getThemeColorsFromBase(base);
  return `:root {\n  ${[
    getVariablesStringForThemeColor(themeColors.primary),
    getVariablesStringForThemeColor(themeColors.secondary),
    getVariablesStringForThemeColor(themeColors.tertiary),
    getVariablesStringForThemeColor(themeColors.background),
    getVariablesStringForThemeColor(themeColors.surface),
    getVariablesStringForThemeColor(themeColors.border),
    getVariablesStringForThemeColor(themeColors.light),
    getVariablesStringForThemeColor(themeColors.medium),
    getVariablesStringForThemeColor(themeColors.dark),
    getVariablesStringForThemeColor(themeColors.success),
    getVariablesStringForThemeColor(themeColors.warning),
    getVariablesStringForThemeColor(themeColors.danger),
  ]
    .join('\n')
    .trim()}\n}\n`;
};
