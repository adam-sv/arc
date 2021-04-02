export function mapToObj(map: Map<number | string, unknown>) {
  const obj = {};
  Array
    .from(map.entries())
    .forEach(([key, value]:[number | string, unknown]) => {
      obj[key] = value;
    });
  return obj;
}
