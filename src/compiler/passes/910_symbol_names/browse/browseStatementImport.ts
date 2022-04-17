import { AstStatementImport } from '../../../data/ast/AstStatementImport.ts';
import { hashLocalSymbol } from '../util/hashLocalSymbol.ts';

export function browseStatementImport(
  astStatementImport: AstStatementImport,
): void {
  for (const astStatementImportSlot of astStatementImport.slots) {
    astStatementImportSlot.symbolLocalVariable = hashLocalSymbol('import', astStatementImportSlot.name);
  }
}
