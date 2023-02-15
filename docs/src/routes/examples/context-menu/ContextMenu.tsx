// dependencies
import React, { useState } from 'react';
// internals
import { ContextMenu } from '@adam-sv/arc';
import { getAppRootElement } from 'src/app';
// types
import type { ICoords, IMenuListItem } from '@adam-sv/arc';

export const ContextMenuExample = (): JSX.Element => {
  const [position, setPosition] = useState<ICoords>();
  const [contextMenuIsOpen, setContextMenuIsOpen] = useState(false);

  function openContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setPosition({ x: e.clientX, y: e.clientY });
    setContextMenuIsOpen(true);
  }

  return (
    <div className='ContextMenuStory'>
      <div className='StoryRow hasMenu' onContextMenu={openContextMenu}>
        Right Click shows custom Context Menu
      </div>
      <div className='StoryRow'>Right Click for browser Context Menu</div>
      <div className='StoryRow hasMenu' onClick={openContextMenu}>
        Left Click for custom Context Menu
      </div>
      {position && (
        <ContextMenu
          isOpen={contextMenuIsOpen}
          setIsOpen={setContextMenuIsOpen}
          position={position}
          items={[
            { label: 'Item One', onClick: clickedItem },
            { label: 'Item Two', onClick: clickedItem },
            { label: 'Sorry, Im uninspired here', onClick: clickedItem },
          ]}
          portalTargetElement={getAppRootElement()}
        />
      )}
    </div>
  );
};

function clickedItem(item: IMenuListItem) {
  console.info('ContextMenu - you clicked:', item);
}
