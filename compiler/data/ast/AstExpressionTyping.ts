import { Ast } from "./Ast.ts";
import { AstExpression } from "./AstExpression.ts";
import { AstType } from "./AstType.ts";

export enum AstExpressionTypingOperator {
  Is = "Is",
}

export interface AstExpressionTyping extends Ast {
  operator: AstExpressionTypingOperator;
  expression: AstExpression;
  type: AstType;

  resolvedType?: AstType;
}
