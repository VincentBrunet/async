export function hashGlobalSymbol(
  hashModule: string,
  prefix: string,
) {
  return ['_', hashModule, '_', prefix].join('');
}
