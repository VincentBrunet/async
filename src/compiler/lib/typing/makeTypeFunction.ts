import { Ast } from "../../data/ast/Ast.ts";
import { AstType, AstTypeKind } from "../../data/ast/AstType.ts";
import { AstTypeFunctionParam } from "../../data/ast/AstTypeFunction.ts";

export function makeTypeFunction(
  params: Array<AstTypeFunctionParam>,
  ret: AstType,
  source?: Ast,
): AstType {
  return {
    kind: AstTypeKind.Function,
    data: {
      params: params,
      ret: ret,
      token: source?.token,
    },
    token: source?.token,
  };
}
