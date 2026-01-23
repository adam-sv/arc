// dependencies
// types
import type { FormResourceState } from './types';

export function FormToast({
  state,
  message,
}: {
  state: FormResourceState;
  message: string;
}) {
  if (state === 'default') {
    return <div className='ArcForm-Toast hidden' />;
  }

  return <div className={`ArcForm-Toast ${state}`}>{message}</div>;
}
