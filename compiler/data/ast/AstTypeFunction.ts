import { AstType } from "./AstType.ts";

export interface AstTypeFunctionParam {
  name?: string;
  type: AstType;
}

export interface AstTypeFunction {
  params: Array<AstTypeFunctionParam>;
  return: AstType;
}
