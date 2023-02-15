export const stripNonHexidecimal = (s: string): string =>
  s.replace(/[^a-f0-9]+/, '');

export const capitalize = (s: string): string =>
  `${s.charAt(0).toUpperCase()}${s.slice(1, s.length)}`;

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
