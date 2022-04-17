import { Ast } from './Ast.ts';
import { AstExpression } from './AstExpression.ts';
import { AstModule } from './AstModule.ts';
import { AstStatementExport } from './AstStatementExport.ts';

export interface AstStatementImportSlot extends Ast {
  name: string;

  resolvedExport?: AstStatementExport;

  symbolLocalVariable?: string;
}

export interface AstStatementImport extends Ast {
  slots: Array<AstStatementImportSlot>;
  url: AstExpression;

  resolvedModule?: AstModule;
}
