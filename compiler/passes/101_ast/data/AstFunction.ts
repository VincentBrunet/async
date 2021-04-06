import { AstBlock } from "./AstBlock.ts";
import { AstType } from "./AstType.ts";

export interface AstFunctionParam {
  name?: string;
  type?: AstType;
}

export interface AstFunction {
  name?: string;
  params?: AstFunctionParam[];
  type?: AstType;
  block?: AstBlock;
}
