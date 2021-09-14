import { AstAnnotation } from "./AstAnnotation.ts";
import { AstBlock } from "./AstBlock.ts";
import { AstClosure } from "./AstClosure.ts";
import { AstParam } from "./AstParam.ts";

export interface AstFunction {
  params: Array<AstParam>;
  return: AstAnnotation;
  block: AstBlock;
  closures?: Array<AstClosure>;
}
