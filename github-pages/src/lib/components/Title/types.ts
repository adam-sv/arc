import type { ArcHorizontalPosition, IARCProps } from '@adam-sv/arc';
import { RenderableContent } from '@adam-sv/arc';

export type TitleTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TitleType = 1 | 2 | 3 | 4 | 5 | 6;
export interface ITitleProps extends IARCProps {
  titleType?: TitleType;
  children?: RenderableContent;
  textAlign?: ArcHorizontalPosition;
}
