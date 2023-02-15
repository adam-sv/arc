import React from 'react';
import { RenderableContent } from '@adam-sv/arc';

export const Case = ({ isDefault, value, children, _match }: any): any => {
  return _match(value, isDefault) ? children : null;
};

export interface IRenderSwitchProps {
  compare: string | number | Array<string | number> | Set<string | number>;
  children: RenderableContent;
}

export const RenderSwitch = ({
  compare,
  children,
}: IRenderSwitchProps): any => {
  if (!children) return <></>;

  let comparisonSet: Set<any>;
  if (Array.isArray(compare)) {
    comparisonSet = new Set(compare);
  } else if (compare instanceof Set) {
    comparisonSet = compare;
  } else {
    comparisonSet = new Set([compare]);
  }

  let hasDefaultMatched = false;
  let matchIndex = -1;
  const match = (index: number) => (value: any, isDefault = false) => {
    if (hasDefaultMatched) return false;

    const isDefaultMatch = matchIndex < 0 && isDefault;
    const isMatch = comparisonSet.has(value) || isDefaultMatch;

    if (isMatch) {
      matchIndex = index;
    }

    if (isDefaultMatch) {
      hasDefaultMatched = true; // as soon as the default is matched it will not render other cases
    }

    return isMatch;
  };

  const inject = (child: any, index: number) =>
    React.cloneElement(child, {
      _match: match(index),
      key: Math.random(),
    });

  const childList = Array.isArray(children) ? children : [children];
  return childList.map(inject);
};
