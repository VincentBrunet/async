import { Ast } from "./Ast.ts";
import { AstStatement } from "./AstStatement.ts";
import { AstStatementTypedef } from "./AstStatementTypedef.ts";
import { AstStatementVariable } from "./AstStatementVariable.ts";

export interface AstStatementExport extends Ast {
  statement: AstStatement;

  resolvedName?: string;
  resolvedStatementVariable?: AstStatementVariable;
  resolvedStatementTypedef?: AstStatementTypedef;
}
