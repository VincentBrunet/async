import { AstFunctionParam } from "./AstFunction.ts";
import { AstType } from "./AstType.ts";
import { AstVariable } from "./AstVariable.ts";

export interface AstIdentifier {
  name: string;
  reference?: AstReference;
}
