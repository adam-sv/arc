export interface IMemoizeOptions<T> {
  equalityTest: (value: T, nextValue: T) => boolean;
  updateWhenFalsy?: boolean;
}
