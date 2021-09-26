import { AstStatementConditionBranch } from "../../../data/ast/AstStatementCondition.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseStatementConditionBranch(
  scope: BrowsedScope,
  ast: AstStatementConditionBranch,
  next: () => void,
) {
  scope.markCollectorStatementVariable();
  next();
  ast.resolvedVariables = scope.getStatementVariables();
}
