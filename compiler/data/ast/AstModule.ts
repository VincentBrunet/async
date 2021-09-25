import { Ast } from "./Ast.ts";
import { AstStatement } from "./AstStatement.ts";
import { AstStatementReturn } from "./AstStatementReturn.ts";

export interface AstModule extends Ast {
  statements: Array<AstStatement>;

  resolvedReturns?: Array<AstStatementReturn>;
}
