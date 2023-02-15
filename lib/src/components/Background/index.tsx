// dependencies
import { cn, ThemeUtils, IARCProps } from '@adam-sv/arc';
// style
import './style.scss';
// types

export interface IBackgroundProps extends IARCProps {
  themeProps?: ThemeUtils.IThemeProps;
}

export const Background = ({
  children,
  className,
  id,
  overrideDefaultClassName,
  style = {},
  themeProps,
}: IBackgroundProps): JSX.Element => {
  const inlineStyle = themeProps
    ? ThemeUtils.generateThemeInlineVariables(themeProps)
    : {};

  return (
    <div
      id={id}
      className={cn(!overrideDefaultClassName && 'ArcBackground', className)}
      style={{ ...inlineStyle, ...style }}
    >
      {children}
    </div>
  );
};
