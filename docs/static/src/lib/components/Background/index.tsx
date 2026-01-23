// dependencies
import { cn, ThemeUtils, IARCProps } from '@adam-sv/arc';
import { RefObject, type JSX } from 'react';
// style
import './style.scss';
// types

export interface IBackgroundProps extends IARCProps {
  themeInputHexes?: ThemeUtils.IThemeInputHexes;
  domRef?: RefObject<HTMLDivElement | null>;
}

export const Background = ({
  children,
  className,
  id,
  overrideDefaultClassName,
  style = {},
  themeInputHexes,
  domRef,
}: IBackgroundProps): JSX.Element => {
  const inlineStyle = themeInputHexes
    ? ThemeUtils.generateThemeInlineVariables(themeInputHexes)
    : {};

  return (
    <div
      id={id}
      className={cn(!overrideDefaultClassName && 'ArcBackground', className)}
      style={{ ...inlineStyle, ...style }}
      ref={domRef}
    >
      {children}
    </div>
  );
};
