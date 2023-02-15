# useMemoizedState

## Usage

```
import { useMemoizedState } from '@adam-sv/arc';

const [value:T, memoizedSetter] = useMemoizedState<T>(initialValue, {
  equalityTest: (value: T, nextValue: T) => boolean;
  updateWhenFalsy?: boolean;
});
```

`updateWhenFalsy` controls if the state updates when the value passed to memoizedSetter is falsy. By default, it does not
