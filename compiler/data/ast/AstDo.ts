import { AstBlock } from "./AstBlock.ts";
import { AstClosure } from "./AstClosure.ts";
import { AstType } from "./AstType.ts";

export interface AstDo {
  type: AstType;
  block?: AstBlock;
  closures?: Array<AstClosure>;
}
