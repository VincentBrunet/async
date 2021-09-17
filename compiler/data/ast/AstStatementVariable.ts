import { AstAnnotation } from "./AstAnnotation.ts";
import { AstExpression } from "./AstExpression.ts";

export interface AstStatementVariable {
  mutable: boolean;
  name: string;
  hash: string;
  annotation: AstAnnotation;
  value?: AstExpression;
}
