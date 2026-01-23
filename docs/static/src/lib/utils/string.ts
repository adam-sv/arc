import { NumberUtils } from '@adam-sv/arc';

export const stripNonHexidecimal = (s: string): string =>
  s.replace(/[^a-f0-9]+/, '');

export const capitalize = (s: string): string =>
  `${s.charAt(0).toUpperCase()}${s.slice(1, s.length)}`;

export const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

export const shorten = (str: string, maxLength: number): string => {
  if (str.length > maxLength) {
    const sliceSize = Math.floor(maxLength / 2) - 1;
    if (sliceSize < 4) {
      return `${str.slice(0, 5)}...`;
    }
    return `${str.slice(0, sliceSize)}...${str.slice(sliceSize * -1)}`;
  }
  return str;
};

export const getRandomAlphaString = (length: number): string => {
  return Array(length)
    .fill(0)
    .map(() => ALPHABET[NumberUtils.getRandomInt(0, 25)])
    .join('');
};

export const getRandomAlphaNumericString = (length: number): string => {
  return Array(length)
    .fill(0)
    .map(() => ALPHABET.concat('0123456789')[NumberUtils.getRandomInt(0, 35)])
    .join('');
};

// transform `NODE_SIZE` to `nodeSize`
export const capitalSnakeToCamelCase = (str: string): string => {
  const segments = str.toLocaleLowerCase().split('_');
  const [first, ...rest] = segments;
  return first.concat(...rest.map((s) => capitalize(s)));
};
