import { AstBlock } from "./AstBlock.ts";
import { AstClosure } from "./AstClosure.ts";
import { AstParam } from "./AstParam.ts";
import { AstType } from "./AstType.ts";

export interface AstFunction {
  params: Array<AstParam>;
  block?: AstBlock;
  return?: AstType;
  closures?: Array<AstClosure>;
}
