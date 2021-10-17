import { Ast } from "./Ast.ts";
import { AstAnnotationType } from "./AstAnnotationType.ts";
import { AstExpression } from "./AstExpression.ts";
import { AstType } from "./AstType.ts";

export interface AstStatementExport extends Ast {
  name: string;
  annotation: AstAnnotationType;
  expression: AstExpression;

  resolvedType?: AstType;
}
