import { AstFunctionParam } from "./AstFunction.ts";
import { AstType } from "./AstType.ts";
import { AstVariable } from "./AstVariable.ts";

export interface AstIdentifierDeclaration {
  closure: boolean;
  name: string;
  type: AstType;
  variable?: AstVariable;
  param?: AstFunctionParam;
}

export interface AstIdentifier {
  name: string;
  declaration?: AstIdentifierDeclaration;
}
