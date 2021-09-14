import { AstAnnotation } from "./AstAnnotation.ts";
import { AstBlock } from "./AstBlock.ts";
import { AstClosure } from "./AstClosure.ts";

export interface AstObject {
  annotation: AstAnnotation;
  block: AstBlock;
  closures?: Array<AstClosure>;
}
