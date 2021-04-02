import type { IARCProps, RenderableContent } from '@adam-sv/arc';
import type { MutableRefObject } from 'react';

export interface IChartContainerProps extends IARCProps {
  // content required
  contentHeight: number;
  contentRenderer: ChartComponentRenderer;
  // axes optional
  bottomAxisHeight?: number;
  bottomAxisRenderer?: ChartComponentRenderer;
  leftAxisWidth?: number;
  leftAxisRenderer?: ChartComponentRenderer;
  rightAxisWidth?: number;
  rightAxisRenderer?: ChartComponentRenderer;
  topAxisHeight?: number;
  topAxisRenderer?: ChartComponentRenderer;
  // sizing options
  isFullHeight?: boolean;
  // zoom options
  initialZoomLevel?: number;
  minZoom?: number;
  maxZoom?: number;
  onlyZoomX?: boolean;
  onlyZoomY?: boolean;
}

export type ChartComponent = 'top' | 'right' | 'bottom' | 'left' | 'content';
export type ChartComponentRenderer = (coordinateSpace: DOMRect, zoom: number) => RenderableContent;

export interface IChartContainerDOMRefs {
  top: MutableRefObject<HTMLDivElement>;
  right: MutableRefObject<HTMLDivElement>;
  bottom: MutableRefObject<HTMLDivElement>;
  left: MutableRefObject<HTMLDivElement>;
  content: MutableRefObject<HTMLDivElement>;
  container: MutableRefObject<HTMLDivElement>;
}

export interface IScrollState {
  left: number;
  top: number;
}

/* DOM Typings below are verbose */
/* Author's note:
 * There was a shadow-conflict between the type WheelEvent provided by react-dom with 0 type information
 * and the valid one provided by TypeScript/lib/lib.dom.d.ts
 * Using duck-typing here allows us to seamlessly integrate with the DOM WheelEvent.
 */
/** An event which takes place in the DOM. */
interface ILibDomEvent {
  /**
   * Returns true or false depending on how event was initialized. True if event goes through its target's ancestors in reverse tree order, and false otherwise.
   */
  readonly bubbles: boolean;
  cancelBubble: boolean;
  /**
   * Returns true or false depending on how event was initialized. Its return value does not always carry meaning, but true can indicate that part of the operation during which event was dispatched, can be canceled by invoking the preventDefault() method.
   */
  readonly cancelable: boolean;
  /**
   * Returns true or false depending on how event was initialized. True if event invokes listeners past a ShadowRoot node that is the root of its target, and false otherwise.
   */
  readonly composed: boolean;
  /**
   * Returns the object whose event listener's callback is currently being invoked.
   */
  readonly currentTarget: EventTarget | null;
  /**
   * Returns true if preventDefault() was invoked successfully to indicate cancelation, and false otherwise.
   */
  readonly defaultPrevented: boolean;
  /**
   * Returns the event's phase, which is one of NONE, CAPTURING_PHASE, AT_TARGET, and BUBBLING_PHASE.
   */
  readonly eventPhase: number;
  /**
   * Returns true if event was dispatched by the user agent, and false otherwise.
   */
  readonly isTrusted: boolean;
  returnValue: boolean;
  /** @deprecated */
  readonly srcElement: EventTarget | null;
  /**
   * Returns the object to which event is dispatched (its target).
   */
  readonly target: EventTarget | null;
  /**
   * Returns the event's timestamp as the number of milliseconds measured relative to the time origin.
   */
  readonly timeStamp: number;
  /**
   * Returns the type of event, e.g. "click", "hashchange", or "submit".
   */
  readonly type: string;
  /**
   * Returns the invocation target objects of event's path (objects on which listeners will be invoked), except for any nodes in shadow trees of which the shadow root's mode is "closed" that are not reachable from event's currentTarget.
   */
  composedPath(): EventTarget[];
  initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void;
  /**
   * If invoked when the cancelable attribute value is true, and while executing a listener for the event with passive set to false, signals to the operation that caused event to be dispatched that it needs to be canceled.
   */
  preventDefault(): void;
  /**
   * Invoking this method prevents event from reaching any registered event listeners after the current one finishes running and, when dispatched in a tree, also prevents event from reaching any other objects.
   */
  stopImmediatePropagation(): void;
  /**
   * When dispatched in a tree, invoking this method prevents event from reaching any objects other than the current object.
   */
  stopPropagation(): void;
  readonly AT_TARGET: number;
  readonly BUBBLING_PHASE: number;
  readonly CAPTURING_PHASE: number;
  readonly NONE: number;
}

export interface IDomWheelEvent extends ILibDomEvent {
  readonly deltaMode: number;
  readonly deltaX: number;
  readonly deltaY: number;
  readonly deltaZ: number;
  readonly DOM_DELTA_LINE: number;
  readonly DOM_DELTA_PAGE: number;
  readonly DOM_DELTA_PIXEL: number;
  readonly altKey: boolean;
  readonly button: number;
  readonly buttons: number;
  readonly clientX: number;
  readonly clientY: number;
  readonly ctrlKey: boolean;
  readonly metaKey: boolean;
  readonly movementX: number;
  readonly movementY: number;
  readonly offsetX: number;
  readonly offsetY: number;
  readonly pageX: number;
  readonly pageY: number;
  readonly relatedTarget: EventTarget | null;
  readonly screenX: number;
  readonly screenY: number;
  readonly shiftKey: boolean;
  readonly x: number;
  readonly y: number;
  getModifierState(keyArg: string): boolean;
  initMouseEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget | null): void;
}
