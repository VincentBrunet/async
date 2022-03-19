import { Ast } from "./Ast.ts";
import { AstResolvedReference } from "./AstResolvedReference.ts";
import { AstType } from "./AstType.ts";

export interface AstTypeIdentifier extends Ast {
  name: string;
  params: Array<AstType>;

  resolvedReference?: AstResolvedReference;
}
