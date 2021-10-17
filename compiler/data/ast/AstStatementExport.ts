import { Ast } from "./Ast.ts";
import { AstAnnotationType } from "./AstAnnotationType.ts";
import { AstExpression } from "./AstExpression.ts";

export interface AstStatementExport extends Ast {
  name: string;
  annotation: AstAnnotationType;
  expression: AstExpression;
}
