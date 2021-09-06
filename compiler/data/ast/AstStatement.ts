import { AstExpression } from "./AstExpression.ts";
import { AstVariable } from "./AstVariable.ts";

export interface AstStatement {
  variable?: AstVariable;
  expression?: AstExpression;
}
