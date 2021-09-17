import { AstAnnotation } from "./AstAnnotation.ts";
import { AstBlock } from "./AstBlock.ts";
import { AstResolvedClosure } from "./AstResolvedClosure.ts";

export interface AstExpressionFunctionParam {
  name: string;
  annotation: AstAnnotation;
}

export interface AstExpressionFunction {
  params: Array<AstExpressionFunctionParam>;
  return: AstAnnotation;
  block: AstBlock;
  closures?: Array<AstResolvedClosure>;
}
