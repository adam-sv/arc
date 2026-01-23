import React, { useEffect, useState } from 'react';

export function useStateThatRespondsToPropChanges<T>(
  initialProp: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setter] = useState(initialProp);
  useEffect(() => {
    setter(initialProp);
  }, [initialProp]);

  return [value, setter];
}
