import { AstExpression } from "../../../data/ast/AstExpression.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpression(
  scope: BrowsedScope,
  ast: AstExpression,
  next: () => void,
) {
  next();
  ast.resolvedType = ast.data.resolvedType;
}
