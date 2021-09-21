import { AstAnnotationType } from "./AstAnnotationType.ts";
import { AstBlock } from "./AstBlock.ts";
import { AstResolvedClosure } from "./AstResolvedClosure.ts";

export interface AstExpressionObject {
  annotation: AstAnnotationType;
  block: AstBlock;
  closures?: Array<AstResolvedClosure>;
}
