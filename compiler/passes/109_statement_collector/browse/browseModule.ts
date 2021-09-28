import { AstModule } from "../../../data/ast/AstModule.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseModule(
  scope: BrowsedScope,
  ast: AstModule,
  next: () => void,
) {
  scope.markCollectorStatementReturn();
  next();
  ast.resolvedReturns = scope.getStatementReturns();
}
