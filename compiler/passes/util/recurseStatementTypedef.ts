import { AstStatementTypedef } from "../../data/ast/AstStatementTypedef.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseStatementTypedef<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstStatementTypedef,
) {
  r.recurseType(r, p, ast.type);
}
