import { AstModule } from "../../../data/ast/AstModule.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseModule(
  scope: BrowsedScope,
  ast: AstModule,
  next: () => Promise<void>,
) {
  scope.markCollectorStatementReturn();
  await next();
  const forbiddens = scope.getStatementReturns();
  // TODO
}
