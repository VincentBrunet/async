import { Ast } from "./Ast.ts";
import { AstExpression } from "./AstExpression.ts";

export interface AstStatementReturn extends Ast {
  expression: AstExpression;
}
