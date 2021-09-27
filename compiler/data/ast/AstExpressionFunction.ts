import { Ast } from "./Ast.ts";
import { AstAnnotationTemplate } from "./AstAnnotationTemplate.ts";
import { AstAnnotationType } from "./AstAnnotationType.ts";
import { AstBlock } from "./AstBlock.ts";
import { AstResolvedClosure } from "./AstResolvedClosure.ts";
import { AstStatementReturn } from "./AstStatementReturn.ts";
import { AstStatementVariable } from "./AstStatementVariable.ts";
import { AstType } from "./AstType.ts";

export interface AstExpressionFunctionParam extends Ast {
  name?: string;
  annotation: AstAnnotationType;

  resolvedType?: AstType;
}

export interface AstExpressionFunction extends Ast {
  template: AstAnnotationTemplate;
  params: Array<AstExpressionFunctionParam>;
  ret: AstAnnotationType;
  block: AstBlock;

  resolvedType?: AstType;
  resolvedClosures?: Array<AstResolvedClosure>;
  resolvedVariables?: Array<AstStatementVariable>;
  resolvedReturns?: Array<AstStatementReturn>;
}
