import { Ast } from "./Ast.ts";
import { AstExpression } from "./AstExpression.ts";
import { AstResolvedClosure } from "./AstResolvedClosure.ts";
import { AstType } from "./AstType.ts";

export interface AstExpressionObjectField extends Ast {
  mutable: boolean;
  name: string;
  hash: string;
  expression: AstExpression;
}

export interface AstExpressionObject extends Ast {
  fields: Array<AstExpressionObjectField>;

  resolvedType?: AstType;
  resolvedClosures?: Array<AstResolvedClosure>;
}
