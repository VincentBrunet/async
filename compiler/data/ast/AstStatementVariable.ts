import { AstAnnotationType } from "./AstAnnotationType.ts";
import { AstExpression } from "./AstExpression.ts";

export interface AstStatementVariable {
  mutable: boolean;
  name: string;
  hash: string;
  annotation: AstAnnotationType;
  value?: AstExpression;
}
