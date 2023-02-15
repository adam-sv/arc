
export function getIndexInArrayWithIds<T extends { id: string | number }>(datum: T, array: T[]): number {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === datum.id) {
      return i;
    }
  }
  return -1;
}
