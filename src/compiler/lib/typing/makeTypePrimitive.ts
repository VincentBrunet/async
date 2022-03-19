import { Ast } from "../../data/ast/Ast.ts";
import { AstType, AstTypeKind } from "../../data/ast/AstType.ts";
import { AstTypePrimitiveNative } from "../../data/ast/AstTypePrimitive.ts";

export function makeTypePrimitive(
  native: AstTypePrimitiveNative,
  params?: Array<AstType>,
  source?: Ast,
) {
  return {
    kind: AstTypeKind.Primitive,
    data: {
      native: native,
      params: params ?? [],
      token: source?.token,
    },
    token: source?.token,
  };
}
