import { Ast } from "./Ast.ts";
import { AstResolvedReference } from "./AstResolvedReference.ts";

export interface AstResolvedClosure extends Ast {
  idx: number;
  name: string;
  resolvedReference?: AstResolvedReference;
}
