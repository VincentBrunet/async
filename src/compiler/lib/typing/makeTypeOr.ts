import { Ast } from "../../data/ast/Ast.ts";
import { AstType, AstTypeKind } from "../../data/ast/AstType.ts";
import { AstTypeBinaryOperator } from "../../data/ast/AstTypeBinary.ts";

export function makeTypeOr(
  type1: AstType,
  type2: AstType,
  source?: Ast,
): AstType {
  return {
    kind: AstTypeKind.Binary,
    data: {
      operator: AstTypeBinaryOperator.Or,
      type1: type1,
      type2: type2,
      token: source?.token,
    },
    token: source?.token,
  };
}
