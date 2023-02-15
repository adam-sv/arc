export function isArray(obj: any) {
  if (!obj) {
    return false;
  } else if (Array.isArray(obj)) {
    return true;
  } else if (typeof obj.slice === 'function' && Array.isArray(obj.slice())) {
    return true;
  }

  return false;
}
