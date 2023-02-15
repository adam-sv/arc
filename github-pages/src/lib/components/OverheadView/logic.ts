import { IOverheadViewDirection } from './types';

export interface IDirectionBreakdown {
  flipped: boolean;
  vertical: boolean;
}

export function parseDirection(
  dir: IOverheadViewDirection
): IDirectionBreakdown {
  return {
    flipped: dir === 'right' || dir === 'down',
    vertical: dir === 'up' || dir === 'down',
  };
}
