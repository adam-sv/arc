// dependencies
import { cn } from '@adam-sv/arc';
// style
import './style.scss';
// types
import type { IARCProps } from '@adam-sv/arc';

export function Spinner({
  overrideDefaultClassName,
  className,
  style,
  id,
}: Omit<IARCProps, 'children'>) {
  return (
    <div
      className={cn(!overrideDefaultClassName && 'Spinner', className)}
      style={style}
      id={id}
    />
  );
}
