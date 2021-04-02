export function shortenString(str: string, maxLength: number) {
  if (str.length > maxLength) {
    const sliceSize = Math.floor(maxLength / 2) - 1;
    if (sliceSize < 4) {
      return `${str.slice(0, 5)}...`;
    }
    return `${str.slice(0, sliceSize)}...${str.slice(sliceSize * -1)}`;
  }
  return str;
}
