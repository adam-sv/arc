export const nearestPow2 = (zoom: number): number => {
  return Math.pow(2, Math.round(Math.log(zoom) / Math.log(2)));
};
