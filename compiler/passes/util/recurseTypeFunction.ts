import { AstTypeFunction } from "../../data/ast/AstTypeFunction.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseTypeFunction<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstTypeFunction,
) {
  for (const param of ast.params) {
    r.recurseType(r, p, param.type);
  }
  r.recurseType(r, p, ast.return);
}
