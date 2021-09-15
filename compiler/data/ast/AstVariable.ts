import { AstAnnotation } from "./AstAnnotation.ts";
import { AstExpression } from "./AstExpression.ts";

export interface AstVariable {
  mutable: boolean;
  name: string;
  hash: string;
  annotation: AstAnnotation;
  value?: AstExpression;
}
