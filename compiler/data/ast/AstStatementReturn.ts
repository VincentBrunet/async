import { Ast } from "./Ast.ts";
import { AstAnnotationType } from "./AstAnnotationType.ts";
import { AstExpression } from "./AstExpression.ts";
import { AstType } from "./AstType.ts";

export interface AstStatementReturn extends Ast {
  annotation: AstAnnotationType;
  value: AstExpression;

  resolvedType?: AstType;
}
