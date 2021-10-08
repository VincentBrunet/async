import { AstModule } from "../../../data/ast/AstModule.ts";
import { assert } from "../../../lib/errors/assert.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseModule(
  scope: BrowsedScope,
  ast: AstModule,
  next: () => Promise<void>,
) {
  scope.markCollectorStatementImport();
  scope.markCollectorStatementExport();
  scope.markCollectorStatementReturn();
  scope.markCollectorStatementVariable();

  await next();

  assert(scope.getStatementReturns().length === 0);

  ast.resolvedImports = scope.getStatementImports();
  ast.resolvedExports = scope.getStatementExports();
  ast.resolvedVariables = scope.getStatementVariables();
}
