export function mapToObj(map: Map<number | string, unknown>): Record<string, any> {
  const obj = {} as Record<string, any>;
  Array
    .from(map.entries())
    .forEach(([key, value]:[number | string, unknown]) => {
      obj[`${key}`] = value;
    });
  return obj;
}
