// dependencies
import React, { useState } from 'react';
// internals
import { View } from './view';
// types
import type { INavigationItem } from './view';
import type { RenderableContent } from '@adam-sv/arc';
export type { INavigationItem };

export type ITopContentGenerator = (isOpen: boolean, hooks?: any) => RenderableContent;
export interface ILeftNavigationProps {
  className?: string;
  items: INavigationItem[];
  bottomItems?: INavigationItem[];
  topContent?: ITopContentGenerator;
  isOpenByDefault?: boolean;
}

export const LeftNavigation = ({
  className,
  items,
  bottomItems,
  topContent,
  isOpenByDefault = false,
}: ILeftNavigationProps) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);
  const handleToggleClick = () => setIsOpen(!isOpen);

  return (
    <View
      items={items}
      className={className}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onToggleClick={handleToggleClick}
      bottomItems={bottomItems}
      topContent={topContent}
    />
  );
};
