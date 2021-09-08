import { AstBlock } from "./AstBlock.ts";
import { AstType } from "./AstType.ts";
import { AstClosure } from "./AstClosure.ts";

export interface AstObject {
  type: AstType;
  block?: AstBlock;
  closures?: Array<AstClosure>;
}
