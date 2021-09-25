import { Ast } from "./Ast.ts";
import { AstAnnotationTemplate } from "./AstAnnotationTemplate.ts";
import { AstAnnotationType } from "./AstAnnotationType.ts";
import { AstBlock } from "./AstBlock.ts";
import { AstResolvedClosure } from "./AstResolvedClosure.ts";
import { AstStatementReturn } from "./AstStatementReturn.ts";
import { AstType } from "./AstType.ts";

export interface AstExpressionFunctionParam extends Ast {
  name: string;
  annotation: AstAnnotationType;
}

export interface AstExpressionFunction extends Ast {
  template: AstAnnotationTemplate;
  params: Array<AstExpressionFunctionParam>;
  return: AstAnnotationType;
  block: AstBlock;

  resolvedType?: AstType;
  resolvedClosures?: Array<AstResolvedClosure>;
  resolvedReturns?: Array<AstStatementReturn>;
}
