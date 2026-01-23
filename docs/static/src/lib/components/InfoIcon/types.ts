import type {
  RenderableContent,
  IARCProps,
  FloatingPanelAnchorDirection,
} from '@adam-sv/arc';

export interface IInfoIconProps extends IARCProps {
  text?: string;
  children?: RenderableContent;
  anchor?: FloatingPanelAnchorDirection;
}
