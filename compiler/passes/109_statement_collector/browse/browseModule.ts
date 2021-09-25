import { AstModule } from "../../../data/ast/AstModule.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseModule(
  scope: BrowsedScope,
  ast: AstModule,
  next: () => void,
) {
  scope.markCollectorStatementVariable();
  scope.markCollectorStatementReturn();
  next();
  ast.resolvedVariables = scope.getStatementVariables();
  ast.resolvedReturns = scope.getStatementReturns();
}
