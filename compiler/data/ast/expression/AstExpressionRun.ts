import { AstAnnotation } from "../AstAnnotation.ts";
import { AstBlock } from "../AstBlock.ts";
import { AstClosure } from "../AstClosure.ts";

export interface AstExpressionRun {
  annotation: AstAnnotation;
  block: AstBlock;
  closures?: Array<AstClosure>;
}
