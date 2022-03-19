import { Ast } from "./Ast.ts";
import { AstStatement } from "./AstStatement.ts";
import { AstStatementVariable } from "./AstStatementVariable.ts";

export interface AstBlock extends Ast {
  statements: Array<AstStatement>;

  resolvedVariables?: Array<AstStatementVariable>;
}
