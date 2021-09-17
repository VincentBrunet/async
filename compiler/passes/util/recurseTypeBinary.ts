import { AstTypeBinary } from "../../data/ast/AstTypeBinary.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseTypeBinary<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstTypeBinary,
) {
  r.recurseType(r, p, ast.type1);
  r.recurseType(r, p, ast.type2);
}
