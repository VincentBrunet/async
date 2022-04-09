import { AstStatementImport } from '../../../data/ast/AstStatementImport.ts';
import { ensure } from '../../../passes/errors/ensure.ts';

export function browseStatementImport(
  astStatementImport: AstStatementImport,
) {
  // Asserts
  const resolvedModule = ensure(astStatementImport.resolvedModule);
  const collectedExportsByName = ensure(resolvedModule.collectedExportsByName);

  // Resolve each slot from the module loaded before
  for (const slot of astStatementImport.slots) {
    slot.resolvedExport = ensure(collectedExportsByName.get(slot.name));
  }
}
