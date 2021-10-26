import { AstModule } from "../../../data/ast/AstModule.ts";
import { AstStatementImport } from "../../../data/ast/AstStatementImport.ts";
import { ensure } from "../../../lib/errors/ensure.ts";

export async function browseStatementImport(
  scope: AstModule,
  ast: AstStatementImport,
  next: () => Promise<void>,
) {
  // Asserts
  const resolvedModule = ensure(ast.resolvedModule);
  const resolvedExportsMap = ensure(resolvedModule.resolvedExports);

  // Recurse
  await next();

  // Resolve each slot from the module loaded before
  for (const slot of ast.slots) {
    const resolvedExport = ensure(resolvedExportsMap.get(slot.name));
    slot.resolvedStatementVariable = resolvedExport.resolvedStatementVariable;
    slot.resolvedStatementTypedef = resolvedExport.resolvedStatementTypedef;
  }
}
