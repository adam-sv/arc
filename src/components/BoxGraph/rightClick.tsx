import * as React from 'react';

export const spawnRightClickMenu = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  items: any[],
) => {
  // const { pageY, pageX } = event;
  // const modal =
  //   <Modal
  //     className="Modal"
  //     style={{ position: 'fixed', top: pageY, left: pageX, width: '220px' }}
  //   >
  //     <MenuList items={items}/>
  //   </Modal>

  console.warn('DEPRECATION WARNING: the Modal changed and @adam-sv/arc\'s maintainers did not update appropriately...');
}
