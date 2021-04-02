import { IARCProps, RenderableContent } from '@adam-sv/arc';
import type { RefObject } from 'react';

export interface IAccordionProps extends IARCProps {
  crossSize?: number;
  items: IAccordionItem[];
  onExpansionChanged?: () => void; // for example if you have a listener that wants to do something with DOM refs
  onlyOneItemCanBeExpanded?: boolean;
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
