import { Ast } from './Ast.ts';
import { AstStatement } from './AstStatement.ts';

export interface AstStatementExport extends Ast {
  statement: AstStatement;

  resolvedName?: string;
  resolvedMutable?: boolean;

  symbolLocalValue?: string;
}
