import { cn, IARCProps } from '@adam-sv/arc';
import './style.scss';

export interface ISurfaceProps extends IARCProps {
  domRef?: React.RefObject<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const Surface = (props: ISurfaceProps): JSX.Element => {
  const {
    className,
    children,
    id,
    overrideDefaultClassName,
    style,
    domRef,
    onClick,
  } = props;

  return (
    <div
      className={cn(className, !overrideDefaultClassName && 'ArcSurface')}
      id={id}
      style={style}
      ref={domRef}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
