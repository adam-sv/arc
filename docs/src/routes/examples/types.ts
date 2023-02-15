import { RenderableContent } from '@adam-sv/arc';

export interface IExampleData {
  component: RenderableContent | (() => RenderableContent);
  path: string;
  renderVertically?: boolean;
  title?: string;
  redirect?: string;
  codeBlocks?: string[];
}
