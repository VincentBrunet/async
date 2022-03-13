import { AstExpression } from "../../../data/ast/AstExpression.ts";
import { Scope } from "../util/Scope.ts";

export function browseExpression(
  scope: Scope,
  ast: AstExpression,
  next: () => void,
) {
  next();
  ast.resolvedType = ast.data.resolvedType;
}
