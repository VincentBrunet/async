import { AstExpressionLookup } from "../../../data/ast/AstExpressionLookup.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionLookup(
  scope: BrowsedScope,
  ast: AstExpressionLookup,
  next: () => void,
) {
  next();

  ast.resolvedType = ast.expression.resolvedType; // TODO
}
