import { AstBlock } from "./AstBlock.ts";
import { AstType } from "./AstType.ts";

export interface AstFunctionParam {
  name?: string;
  type: AstType;
}

export interface AstFunction {
  params: Array<AstFunctionParam>;
  block?: AstBlock;
  return?: AstType;
}
