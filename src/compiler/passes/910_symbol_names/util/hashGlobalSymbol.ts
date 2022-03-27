import { Ast } from '../../../data/ast/Ast.ts';
import { ensure } from '../../errors/ensure.ts';

export function hashGlobalSymbol(
  hashModule: string,
  symbol: Ast,
  prefix: string,
) {
  const begin = ensure(ensure(symbol.token).begin);
  const hashLocation = begin.toString(16).padStart(8, '0');
  return ['_', hashModule, '_', prefix, '_', '0x', hashLocation].join('');
}
