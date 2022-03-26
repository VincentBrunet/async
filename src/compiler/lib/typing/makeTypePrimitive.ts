import { Ast } from '../../data/ast/Ast.ts';
import { astTypeMakePrimitive } from '../../data/ast/AstType.ts';
import { AstTypePrimitiveNative } from '../../data/ast/AstTypePrimitive.ts';

export function makeTypePrimitive(
  native: AstTypePrimitiveNative,
  source?: Ast,
) {
  return astTypeMakePrimitive({
    native: native,
    token: source?.token,
  });
}
