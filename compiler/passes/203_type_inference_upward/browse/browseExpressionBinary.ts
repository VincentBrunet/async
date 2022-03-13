import { AstExpressionBinary } from "../../../data/ast/AstExpressionBinary.ts";
import { Scope } from "../util/Scope.ts";

export function browseExpressionBinary(
  scope: Scope,
  ast: AstExpressionBinary,
  next: () => void,
) {
  next();

  ast.resolvedType = ast.expression2.resolvedType; // TODO
}
