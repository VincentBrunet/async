import { AstModule } from "../../../data/ast/AstModule.ts";
import { assert } from "../../../lib/errors/assert.ts";
import { Scope } from "../util/Scope.ts";

export async function browseModule(
  scope: Scope,
  ast: AstModule,
  next: () => Promise<void>,
) {
  scope.markCollectorStatementReturn();
  scope.markCollectorStatementImport();
  scope.markCollectorStatementExport();

  await next();

  assert(scope.getStatementReturns().length === 0);
  ast.resolvedImports = scope.getStatementImports();
  ast.resolvedExports = scope.getStatementExports();
}
