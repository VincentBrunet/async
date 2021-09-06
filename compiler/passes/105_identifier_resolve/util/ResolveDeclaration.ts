import { AstFunctionParam } from "../../../data/ast/AstFunction.ts";
import { AstType } from "../../../data/ast/AstType.ts";
import { AstVariable } from "../../../data/ast/AstVariable.ts";

export interface ResolveDeclaration {
  name: string;
  type: AstType;
  variable?: AstVariable;
  param?: AstFunctionParam;
}
