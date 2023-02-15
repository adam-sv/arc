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

  return roundFn((num - baseOffset) / toNearest) * toNearest + baseOffset;
};

export const clamp = (num: number, min: number, max: number): number => {
  return Math.max(Math.min(max, num), min);
};
