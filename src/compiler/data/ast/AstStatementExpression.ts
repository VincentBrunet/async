import { Ast } from "./Ast.ts";
import { AstExpression } from "./AstExpression.ts";

export interface AstStatementExpression extends Ast {
  expression: AstExpression;
}
