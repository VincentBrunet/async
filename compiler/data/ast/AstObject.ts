import { AstBlock } from "./AstBlock.ts";
import { AstClosure } from "./AstClosure.ts";
import { AstType } from "./AstType.ts";

export interface AstObject {
  type: AstType;
  block: AstBlock;
  closures?: Array<AstClosure>;
}
