export function mapToObj(
  map: Map<number | string, unknown>
): Record<string, unknown> {
  const obj = {} as Record<string, unknown>;
  Array.from(map.entries()).forEach(
    ([key, value]: [number | string, unknown]) => {
      obj[`${key}`] = value;
    }
  );
  return obj;
}
