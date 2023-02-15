import type { IARCProps, RenderableContent } from '@adam-sv/arc';

export interface IStretchyPointerProps extends IARCProps {
  overflowDirection: 'left' | 'right';
  overflowAmount: string;
  children: RenderableContent;
}
