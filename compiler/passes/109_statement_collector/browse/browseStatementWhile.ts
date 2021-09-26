import { AstStatementWhile } from "../../../data/ast/AstStatementWhile.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseStatementWhile(
  scope: BrowsedScope,
  ast: AstStatementWhile,
  next: () => void,
) {
  scope.markCollectorStatementVariable();
  next();
  ast.resolvedVariables = scope.getStatementVariables();
}
