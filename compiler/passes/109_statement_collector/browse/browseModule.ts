import { AstModule } from "../../../data/ast/AstModule.ts";
import { assert } from "../../../lib/errors/assert.ts";
import { Scope } from "../util/Scope.ts";

export async function browseModule(
  scope: Scope,
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
