import { AstExpressionLookup } from "../../../data/ast/AstExpressionLookup.ts";
import { Scope } from "../util/Scope.ts";

export function browseExpressionLookup(
  scope: Scope,
  ast: AstExpressionLookup,
  next: () => void,
) {
  next();

  ast.resolvedType = ast.expression.resolvedType; // TODO
}
