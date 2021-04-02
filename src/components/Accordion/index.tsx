// dependencies
import React, { createRef, SyntheticEvent, useRef, useState, useLayoutEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// internals
import { Button, cn } from '@adam-sv/arc';
// style
import './style.css';
// types
import type { AccordionItemId, IAccordionItem, IAccordionItemDomState, IAccordionProps } from './types';
export type { AccordionItemId, IAccordionItem, IAccordionProps };

export function Accordion(props: IAccordionProps) {
  const crossSize = props.crossSize || 14;
  const [componentHeight, setComponentHeight] = useState(0);
  const itemDomMapRef = useRef<Map<AccordionItemId, IAccordionItemDomState>>(new Map());
  const itemDomMap = itemDomMapRef.current || new Map();

  const [expandedMap, setExpandedMap] = useState<Map<AccordionItemId, boolean>>(
    new Map(props.items.map(item => [item.id, !!item.isInitiallyExpanded]))
  );

  props.items.forEach(item => {
    if (!itemDomMap.get(item.id)) {
      itemDomMap.set(item.id, {
        labelRef: createRef<HTMLDivElement>(),
        contentRef: createRef<HTMLDivElement>(),
      });
    } else if (!expandedMap.has(item.id)) {
      expandedMap.set(item.id, !!item.isInitiallyExpanded);
    }
  });

  useLayoutEffect(() => {
    setComponentHeight(props.items.reduce(
      (totalHeight, item) =>
        totalHeight + getItemHeight(item.id),
      0,
    ));
    return props.onExpansionChanged;
  }, [props.items, expandedMap, itemDomMapRef]);

  // I dont know why this setTimeout hack needs to be here but it does
  // lifecycles and renderings and refs and such
  function toggleExpansion(item: IAccordionItem) {
    if (props.onlyOneItemCanBeExpanded) {
      const itemWasExpanded = expandedMap.get(item.id);
      setExpandedMap(new Map(props.items.map(otherItem => [otherItem.id, false])));
      setTimeout(() => setExpandedMap(new Map(props.items.map(otherItem => [
        otherItem.id,
        otherItem.id === item.id
          ? !itemWasExpanded
          : false,
      ]))));
    } else {
      setExpandedMap(new Map(props.items.map((otherItem: IAccordionItem) => [
        otherItem.id,
        otherItem.id === item.id
          ? !expandedMap.get(otherItem.id)
          : !!expandedMap.get(otherItem.id),
      ])));
    }
  }

  function getItemHeight(id: AccordionItemId) {
    const domRefs = itemDomMap.get(id);
    if (!domRefs) {
      return 0;
    }
    const { contentRef, labelRef } = domRefs;
    return (
      isNaNTo0OrNum(expandedMap.get(id) && contentRef.current && contentRef.current.scrollHeight)
      + isNaNTo0OrNum(labelRef.current && labelRef.current.scrollHeight)
    );
  }

  return (
    <TransitionGroup
      className={cn("ArcAccordion", props.className)}
      style={{ height: componentHeight || 'auto' }}
    >
      {props.items.map(item => {
        const rtgRequiredRef = createRef<HTMLDivElement>();
        return (
          <CSSTransition
            in={true}
            timeout={300}
            classNames="item"
            key={item.id}
            nodeRef={rtgRequiredRef}
          >
            <div
              className="item"
              data-child-id={JSON.stringify(item.id)}
              style={{ height: getItemHeight(item.id) }}
              ref={rtgRequiredRef}
            >
              <div
                className="header"
                onClick={() => toggleExpansion(item)}
                ref={itemDomMap.get(item.id)?.labelRef}
              >
                <Button
                  className={cn("ArcAccordion-Button", expandedMap.get(item.id) && 'expanded')}
                  onClick={(ev: SyntheticEvent) => {
                    ev.stopPropagation();
                    toggleExpansion(item);
                  }}
                >
                  <svg viewBox={`0 0 ${crossSize} ${crossSize}`} className="X" height={crossSize} width={crossSize}>
                    <line x1={crossSize / 2} x2={crossSize / 2} y1={0} y2={crossSize} />
                    <line x1={0} x2={crossSize} y1={crossSize / 2} y2={crossSize / 2} />
                  </svg>
                </Button>
                <div className="label">
                  {item.label}
                </div>
              </div>
              <div
                className={expandedMap.get(item.id) ? 'children expanded' : 'children collapsed'}
                ref={itemDomMap.get(item.id)!.contentRef}
                style={{
                  height: expandedMap.get(item.id)
                    ? isNaNTo0OrNum(itemDomMap.get(item.id)?.contentRef.current?.scrollHeight)
                    : 0,
                }}
              >
                {item.children}
              </div>
            </div>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}

function isNaNTo0OrNum(num: number | false | undefined | null) {
  if (!num) {
    return 0;
  } else if (isNaN(num)) {
    return 0;
  }
  return num;
}
