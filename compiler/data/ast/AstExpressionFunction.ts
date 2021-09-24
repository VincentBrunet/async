import { AstAnnotationTemplate } from "./AstAnnotationTemplate.ts";
import { AstAnnotationType } from "./AstAnnotationType.ts";
import { AstBlock } from "./AstBlock.ts";
import { AstResolvedClosure } from "./AstResolvedClosure.ts";
import { AstType } from "./AstType.ts";

export interface AstExpressionFunctionParam {
  name: string;
  annotation: AstAnnotationType;
}

export interface AstExpressionFunction {
  template: AstAnnotationTemplate;
  params: Array<AstExpressionFunctionParam>;
  return: AstAnnotationType;
  block: AstBlock;

  resolvedType?: AstType;
  resolvedClosures?: Array<AstResolvedClosure>;
}
