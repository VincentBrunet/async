import { Ast } from "./Ast.ts";
import { AstStatement } from "./AstStatement.ts";
import { AstStatementReturn } from "./AstStatementReturn.ts";
import { AstStatementVariable } from "./AstStatementVariable.ts";

export interface AstModule extends Ast {
  statements: Array<AstStatement>;

  resolvedVariables?: Array<AstStatementVariable>;
  resolvedReturns?: Array<AstStatementReturn>;
}
