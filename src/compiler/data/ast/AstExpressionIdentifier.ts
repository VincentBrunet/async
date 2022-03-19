import { Ast } from "./Ast.ts";
import { AstResolvedReference } from "./AstResolvedReference.ts";
import { AstType } from "./AstType.ts";

export interface AstExpressionIdentifier extends Ast {
  name: string;

  resolvedType?: AstType;
  resolvedReference?: AstResolvedReference;
}
