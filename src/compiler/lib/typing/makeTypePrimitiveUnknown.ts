import { Ast } from '../../data/ast/Ast.ts';
import { AstTypePrimitiveNative } from '../../data/ast/AstTypePrimitive.ts';
import { makeTypePrimitive } from './makeTypePrimitive.ts';

export function makeTypePrimitiveUnknown(
  source?: Ast,
) {
  return makeTypePrimitive(AstTypePrimitiveNative.Unknown, source);
}
