export function ensure<T>(needed?: T, message?: string): T {
  if (needed === undefined) {
    throw new Error('Ensure on undefined object: ' + message);
  }
  return needed!;
}
