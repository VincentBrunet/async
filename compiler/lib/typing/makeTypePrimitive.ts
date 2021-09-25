import { Ast } from "../../data/ast/Ast.ts";
import { AstType, AstTypeKind } from "../../data/ast/AstType.ts";
import { AstTypePrimitiveId } from "../../data/ast/AstTypePrimitive.ts";

export function makeTypePrimitive(
  id: AstTypePrimitiveId,
  params?: Array<AstType>,
  source?: Ast,
) {
  return {
    kind: AstTypeKind.Primitive,
    data: {
      id: id,
      params: params ?? [],
      token: source?.token,
    },
    token: source?.token,
  };
}
