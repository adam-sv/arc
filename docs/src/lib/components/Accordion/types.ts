import { IARCProps, RenderableContent } from '@adam-sv/arc';
import type { RefObject } from 'react';

export interface IAccordionProps extends IARCProps {
  // pass items to expand collapse
  // TODO: we should reimplement this as <details><summary></summary></details> markup
  items: IAccordionItem[];
  // expansion logic
  onlyOneItemCanBeExpanded?: boolean;
  expandHeightAndWidth?: boolean;
  horizontal?: 'left' | 'right';
  onExpansionChanged?: () => void; // for example if you have a listener that wants to do something with DOM refs
  // button configuration
  crossSize?: number;
  customButton?: JSX.Element;
  rightSideButton?: boolean;
}

export type AccordionItemId = string | number;

export interface IAccordionItem {
  id: AccordionItemId;
  children: RenderableContent;
  isInitiallyExpanded?: boolean;
  label: RenderableContent;
}

export interface IAccordionItemDomState {
  contentRef: RefObject<HTMLDivElement>;
  labelRef: RefObject<HTMLDivElement>;
}
