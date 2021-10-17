import { Ast } from "./Ast.ts";
import { AstAnnotationType } from "./AstAnnotationType.ts";
import { AstExpression } from "./AstExpression.ts";

export interface AstStatementReturn extends Ast {
  annotation: AstAnnotationType;
  expression: AstExpression;
}
