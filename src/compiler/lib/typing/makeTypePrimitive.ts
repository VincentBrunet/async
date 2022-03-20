import { Ast } from '../../data/ast/Ast.ts';
import { AstTypeKind } from '../../data/ast/AstType.ts';
import { AstTypePrimitiveNative } from '../../data/ast/AstTypePrimitive.ts';

export function makeTypePrimitive(
  native: AstTypePrimitiveNative,
  source?: Ast,
) {
  return {
    kind: AstTypeKind.Primitive,
    data: {
      native: native,
      token: source?.token,
    },
    token: source?.token,
  };
}
