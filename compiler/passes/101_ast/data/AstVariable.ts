import { AstExpression } from "./AstExpression.ts";
import { AstType } from "./AstType.ts";

export interface AstVariable {
  mutable: boolean;
  name: string;
  type?: AstType;
  value?: AstExpression;
}
