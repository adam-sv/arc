import { RenderableContent } from '@adam-sv/arc';

export interface IExampleData {
  component: RenderableContent | (() => RenderableContent);
  /**
   * URL path where route will sit
   */
  path: string;
  renderVertically?: boolean;
  /**
   * Title of example page
   */
  title?: string;
  redirect?: string;
  codeBlocks?: string[];
  exampleClassName?: string;
}
