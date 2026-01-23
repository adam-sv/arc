// dependencies
import { cn } from '@adam-sv/arc';
// internals
// style
import './style.scss';
// types
import type { IARCProps } from '@adam-sv/arc';
import { Spinner } from '../Spinner';
export interface ILoaderProps extends IARCProps {
  error?: boolean;
  userMessage?: string;
}

export function Loader({
  className,
  error,
  userMessage = 'Loading...',
}: Readonly<ILoaderProps>) {
  return (
    <div className={cn('Loader', className)}>
      <Spinner className={error ? 'ErrorSpinner' : undefined} />
      {userMessage}
    </div>
  );
}
