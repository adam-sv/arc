// dependencies
import {
  createRef,
  SyntheticEvent,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// internals
import { cn } from '@adam-sv/arc';
// style
import './style.scss';
// types
import type {
  AccordionItemId,
  IAccordionItem,
  IAccordionItemDomState,
  IAccordionProps,
} from './types';

export type { AccordionItemId, IAccordionItem, IAccordionProps };

const XIcon = ({ crossSize = 14 }: { crossSize: number }): JSX.Element => (
  <svg
    viewBox={`0 0 ${crossSize} ${crossSize}`}
    className='X'
    height={crossSize}
    width={crossSize}
  >
    <line x1={crossSize / 2} x2={crossSize / 2} y1={0} y2={crossSize} />
    <line x1={0} x2={crossSize} y1={crossSize / 2} y2={crossSize / 2} />
  </svg>
);

export const Accordion = ({
  className,
  crossSize = 14,
  customButton,
  expandHeightAndWidth,
  horizontal,
  id,
  items,
  onExpansionChanged,
  onlyOneItemCanBeExpanded,
  rightSideButton,
  style,
}: IAccordionProps): JSX.Element => {
  const [componentHeight, setComponentHeight] = useState(0);
  const [componentWidth, setComponentWidth] = useState(0);
  const itemDomMapRef = useRef<Map<AccordionItemId, IAccordionItemDomState>>(
    new Map()
  );
  const itemDomMap = itemDomMapRef.current || new Map();
  const [expandedMap, setExpandedMap] = useState<Map<AccordionItemId, boolean>>(
    () => getInitialExpansionMap({ items, onlyOneItemCanBeExpanded })
  );

  // Accordion initialization
  items.forEach((item) => {
    // adds items into the itemDomMap if not already present
    // adding in this way also creates a ref for the label and content
    if (!itemDomMap.has(item.id)) {
      itemDomMap.set(item.id, {
        labelRef: createRef<HTMLDivElement>(),
        contentRef: createRef<HTMLDivElement>(),
      });
    }
  });

  useLayoutEffect(() => {
    setComponentHeight(
      !horizontal || expandHeightAndWidth
        ? items.reduce(
            (totalHeight, item) => totalHeight + getItemHeight(item.id),
            0
          )
        : 0
    );
    setComponentWidth(
      horizontal || expandHeightAndWidth
        ? items.reduce(
            (totalWidth, item) => totalWidth + getItemWidth(item.id),
            0
          )
        : 0
    );

    return onExpansionChanged;
  }, [items, expandedMap, itemDomMapRef]);

  function toggleExpansion(item: IAccordionItem): void {
    if (onlyOneItemCanBeExpanded) {
      setExpandedMap(
        (expandedMap) =>
          new Map(
            [...expandedMap.entries()].map(([key, value]) => [
              key,
              item.id === key ? !value : false,
            ])
          )
      );
    } else {
      setExpandedMap(
        (expandedMap) =>
          new Map(
            [...expandedMap.entries()].map(([key, value]) => [
              key,
              item.id === key ? !value : value,
            ])
          )
      );
    }
  }

  function getItemHeight(id: AccordionItemId): number {
    const domRefs = itemDomMap.get(id);
    if (!domRefs) {
      return 0;
    }
    const { contentRef, labelRef } = domRefs;
    return (
      isNaNTo0OrNum(
        expandedMap.get(id) &&
          contentRef.current &&
          contentRef.current.scrollHeight
      ) + isNaNTo0OrNum(labelRef.current && labelRef.current.scrollHeight)
    );
  }

  function getItemWidth(id: AccordionItemId) {
    const domRefs = itemDomMap.get(id);
    if (!domRefs) {
      return 0;
    }
    const { contentRef, labelRef } = domRefs;
    return (
      //A check to see if item has an actual width when the function is called,
      //if the width is NaN then it is set to 0 to avoid errors.
      isNaNTo0OrNum(
        expandedMap.get(id) &&
          contentRef.current &&
          contentRef.current.scrollWidth
      ) + isNaNTo0OrNum(labelRef.current && labelRef.current.scrollWidth)
    );
  }

  const sizeStyle = expandHeightAndWidth
    ? {
        width: componentWidth || 'auto',
        height: componentHeight || 'auto',
      }
    : horizontal
    ? { width: componentWidth || 'auto' }
    : { height: componentHeight || 'auto' };

  return (
    <TransitionGroup
      className={cn(
        'ArcAccordion',
        className,
        horizontal ? 'ArcAccordion-Horizontal' : ''
      )}
      id={id}
      style={{
        ...style,
        ...sizeStyle,
      }}
    >
      {items.map((item, index) => {
        const rtgRequiredRef = createRef<HTMLDivElement>();

        return (
          <CSSTransition
            in={true}
            timeout={300}
            classNames='item'
            key={item.id}
            nodeRef={rtgRequiredRef}
          >
            <div
              className={cn(
                'item',
                horizontal === 'right'
                  ? 'item-Horizontal'
                  : horizontal === 'left'
                  ? 'item-HorizontalLeft'
                  : ''
              )}
              data-child-id={JSON.stringify(item.id)}
              style={
                expandHeightAndWidth
                  ? {
                      width: getItemWidth(item.id),
                      height: getItemHeight(item.id),
                    }
                  : horizontal
                  ? { width: getItemWidth(item.id) }
                  : { height: getItemHeight(item.id) }
              }
              ref={rtgRequiredRef}
            >
              <div
                className={cn(
                  'header',
                  rightSideButton ? 'header-rightButton' : ''
                )}
                onClick={() => toggleExpansion(item)}
                ref={itemDomMap.get(item.id)?.labelRef}
              >
                {/* Changed the bellow to a div because the button had
              styles already that I couldnt fix without using the background
              style*/}
                <div
                  className={cn(
                    'ArcAccordion-Button',
                    expandedMap.get(item.id) && 'expanded'
                  )}
                  onClick={(ev: SyntheticEvent) => {
                    ev.stopPropagation();
                    toggleExpansion(item);
                  }}
                  data-testid={`accordion-control-button-${index}`}
                >
                  {customButton ? (
                    customButton
                  ) : (
                    <XIcon crossSize={crossSize} />
                  )}
                </div>
                <div className='label'>{item.label}</div>
              </div>
              <div
                className={
                  expandedMap.get(item.id)
                    ? 'children expanded'
                    : 'children collapsed'
                }
                ref={itemDomMap.get(item.id)?.contentRef}
                style={
                  expandHeightAndWidth
                    ? {
                        width: expandedMap.get(item.id)
                          ? isNaNTo0OrNum(
                              itemDomMap.get(item.id)?.contentRef.current
                                ?.scrollWidth
                            )
                          : 0,
                        height: expandedMap.get(item.id)
                          ? isNaNTo0OrNum(
                              itemDomMap.get(item.id)?.contentRef.current
                                ?.scrollHeight
                            )
                          : 0,
                      }
                    : horizontal
                    ? {
                        width: expandedMap.get(item.id)
                          ? isNaNTo0OrNum(
                              itemDomMap.get(item.id)?.contentRef.current
                                ?.scrollWidth
                            )
                          : 0,
                      }
                    : {
                        height: expandedMap.get(item.id)
                          ? isNaNTo0OrNum(
                              itemDomMap.get(item.id)?.contentRef.current
                                ?.scrollHeight
                            )
                          : 0,
                      }
                }
              >
                {item.children}
              </div>
            </div>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

function isNaNTo0OrNum(num: number | false | undefined | null): number {
  if (!num) {
    return 0;
  } else if (isNaN(num)) {
    return 0;
  }
  return num;
}

function getInitialExpansionMap({
  items,
  onlyOneItemCanBeExpanded,
}: IAccordionProps) {
  const mapConstructorArray: [AccordionItemId, boolean][] = items.map(
    (item) => [item.id, !!item.isInitiallyExpanded]
  );
  if (onlyOneItemCanBeExpanded) {
    let hasSkippedOne = false;
    for (const pair of mapConstructorArray) {
      if (hasSkippedOne) {
        pair[1] = false;
      } else if (pair[1]) {
        hasSkippedOne = true;
      }
    }
  }
  return new Map(mapConstructorArray);
}
