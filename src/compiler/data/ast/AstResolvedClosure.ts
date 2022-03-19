import { Ast } from "./Ast.ts";
import { AstResolvedReference } from "./AstResolvedReference.ts";
import { AstType } from "./AstType.ts";

export interface AstResolvedClosure extends Ast {
  idx: number;
  name: string;

  resolvedType?: AstType;
  resolvedReference?: AstResolvedReference;
}
