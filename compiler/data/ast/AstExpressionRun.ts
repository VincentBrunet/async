import { AstAnnotation } from "./AstAnnotation.ts";
import { AstBlock } from "./AstBlock.ts";
import { AstResolvedClosure } from "./AstResolvedClosure.ts";

export interface AstExpressionRun {
  annotation: AstAnnotation;
  block: AstBlock;
  closures?: Array<AstResolvedClosure>;
}
