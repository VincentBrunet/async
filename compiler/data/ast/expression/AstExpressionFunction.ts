import { AstAnnotation } from "../AstAnnotation.ts";
import { AstBlock } from "../AstBlock.ts";
import { AstParam } from "../AstParam.ts";
import { AstResolvedClosure } from "../resolved/AstResolvedClosure.ts";

export interface AstExpressionFunction {
  params: Array<AstParam>;
  return: AstAnnotation;
  block: AstBlock;
  closures?: Array<AstResolvedClosure>;
}
