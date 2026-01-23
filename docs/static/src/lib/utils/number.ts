export const round = (
  num: number,
  direction?: 'up' | 'down' | 'closest',
  toNearest?: number,
  base?: number // allows you to round toNearest relative to a different number
  // ex: 141 rounded to nearest 3, relative to base 131 would yield 140
  // ex: 142 rounded to nearest 3, relative to base 131 would yield 143
): number => {
  if (!toNearest) toNearest = 1;
  if (!base) base = 0;
  if (!direction) direction = 'closest';
  const baseOffset = base % toNearest;
  const roundFn =
    direction === 'closest'
      ? Math.round
      : direction === 'up'
      ? Math.ceil
      : Math.floor;

  // calculate rounded number
  let rounded =
    roundFn((num - baseOffset) / toNearest) * toNearest + baseOffset;

  // enforce the same decimal precision as toNearest
  // this stops JS floating point issues like 23.33 * 0.01 = 23.330000000000002
  const toNearestString = toNearest.toString();
  if (toNearestString.includes('.')) {
    // if there is a decimal in toNearest
    // enforce the correct number of decimal places
    const afterDemical = toNearestString.split('.')[1];
    const fixedDemicalPlaces = afterDemical.length;
    rounded = parseFloat(rounded.toFixed(fixedDemicalPlaces));
  }

  return rounded;
};

export const clamp = (num: number, min: number, max: number): number => {
  return Math.max(Math.min(max, num), min);
};

export const getRandomInt = (min: number, max: number): number => {
  max += 1; // we're using floor so to make max inclusive, we add 1;
  return Math.floor(Math.random() * Math.abs(max - min) + min);
};
