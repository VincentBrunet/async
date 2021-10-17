import { Ast } from "./Ast.ts";
import { AstAnnotationType } from "./AstAnnotationType.ts";
import { AstExpression } from "./AstExpression.ts";
import { AstResolvedClosure } from "./AstResolvedClosure.ts";
import { AstType } from "./AstType.ts";

export interface AstExpressionObjectField extends Ast {
  mutable: boolean;
  name: string;
  hash: string;
  annotation: AstAnnotationType;
  expression: AstExpression;
}

export interface AstExpressionObject extends Ast {
  annotation: AstAnnotationType;
  fields: Array<AstExpressionObjectField>;

  resolvedType?: AstType;
  resolvedClosures?: Array<AstResolvedClosure>;
}
