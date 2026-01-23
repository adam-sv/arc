import { WCRectangle } from '.';
import type { IBoxSize, ICoords } from '@adam-sv/arc';

export function positionSizeToWebcolaRectangle(
  position: ICoords,
  size: IBoxSize
) {
  const { x, y } = position;
  const { width, height } = size;
  return new WCRectangle(x, x + width, y, y + height);
}

export const LogicalGraphUtils = {
  positionSizeToWebcolaRectangle,
};
