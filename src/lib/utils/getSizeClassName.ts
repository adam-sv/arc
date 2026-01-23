import type { ArcComponentSize } from '@adam-sv/arc';

export function getSizeClassName(size?: ArcComponentSize) {
  if (!size) {
    return '';
  }

  return {
    default: 'ArcSizeDefault',
    compact: 'ArcSizeCompact',
    large: 'ArcSizeLarge',
  }[size];
}
