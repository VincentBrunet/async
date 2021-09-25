import { Ast } from "./Ast.ts";
import { AstAnnotationType } from "./AstAnnotationType.ts";
import { AstExpression } from "./AstExpression.ts";

export interface AstStatementVariable extends Ast {
  mutable: boolean;
  name: string;
  hash: string;
  annotation: AstAnnotationType;
  value?: AstExpression;
}
