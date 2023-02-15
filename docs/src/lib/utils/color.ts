export type RGBComponents = {
  r: number;
  g: number;
  b: number;
};

export type HSVComponents = {
  h: number; // 0 - 360
  s: number; // 0 - 100
  v: number; // 0 - 100
};

/*
 *
 *  Colour Manipulation Functions
 *
 */

export const lightenDarkenColor = (
  hexidecimal: string,
  changeFraction: number
): string => {
  if (hexidecimal[0] == '#') {
    hexidecimal = hexidecimal.slice(1);
  }

  const { r, g, b } = hexToRgbComponents(hexidecimal);

  const multiplier = 1 + changeFraction;
  const outComponents: RGBComponents = {
    r: Math.min(Math.max(Math.round(r * multiplier), 0), 255),
    g: Math.min(Math.max(Math.round(g * multiplier), 0), 255),
    b: Math.min(Math.max(Math.round(b * multiplier), 0), 255),
  };
  const hexOut = rgbToHex(outComponents);
  return hexOut;
};

export const rgbToHsv = ({ r, g, b }: RGBComponents): HSVComponents => {
  (r /= 255), (g /= 255), (b /= 255);

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s;

  const l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h = h / 6;
  }

  return {
    h: h * 360,
    s: s * 100,
    v: l * 100,
  };
};

export const hsvToRgb = ({ h, s, v }: HSVComponents): RGBComponents => {
  h = h / 360;
  s = s / 100;
  v = v / 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  let r, g, b;

  if (s == 0) {
    r = g = b = v; // achromatic
  } else {
    const q = v < 0.5 ? v * (1 + s) : v + s - v * s;
    const p = 2 * v - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: r * 255,
    g: g * 255,
    b: b * 255,
  };
};

export const getColorOnSpectrum = (
  rgb1: RGBComponents,
  rgb2: RGBComponents,
  fraction: number
): RGBComponents => ({
  r: Math.floor(rgb1.r + (rgb2.r - rgb1.r) * fraction),
  g: Math.floor(rgb1.g + (rgb2.g - rgb1.g) * fraction),
  b: Math.floor(rgb1.b + (rgb2.b - rgb1.b) * fraction),
});

// based on guidelines found here:
// https://www.w3.org/TR/WCAG20/
export const computeTextColorBasedOnBackground = (
  bgColor: string,
  lightColor: string,
  darkColor: string
): string => {
  const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
  const uicolors = [r / 255, g / 255, b / 255];
  const c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179 ? darkColor : lightColor;
};

export const hexToRgbComponents = (hex: string): RGBComponents => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

const rgbComponentToHex = (c: number): string => {
  const hex = Math.round(c).toString(16);
  return `${hex.length == 1 ? '0' : ''}${hex}`;
};

export const rgbToHex = ({ r, g, b }: RGBComponents): string =>
  `#${rgbComponentToHex(r)}${rgbComponentToHex(g)}${rgbComponentToHex(b)}`;

export const hexToRgba = (hex: string, alpha?: number): string => {
  const { r, g, b } = hexToRgbComponents(hex);
  return `rgba(${r} ${g} ${b} / ${Math.round((alpha || 1) * 100)}%)`;
};
