import { Ast } from "./Ast.ts";
import { AstResolvedShorthand } from "./AstResolvedShorthand.ts";
import { AstType } from "./AstType.ts";

export interface AstTypeIdentifier extends Ast {
  name: string;
  params: Array<AstType>;
  resolvedShorthand?: AstResolvedShorthand;
}
