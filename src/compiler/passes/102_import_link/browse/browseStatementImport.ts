import { AstStatementImport } from '../../../data/ast/AstStatementImport.ts';
import { ensure } from '../../../passes/errors/ensure.ts';

export function browseStatementImport(
  ast: AstStatementImport,
) {
  // Asserts
  const resolvedModule = ensure(ast.resolvedModule);
  const resolvedExportsMap = ensure(resolvedModule.resolvedExports);

  // Resolve each slot from the module loaded before
  for (const slot of ast.slots) {
    slot.resolvedExport = ensure(resolvedExportsMap.get(slot.name));
  }
}
