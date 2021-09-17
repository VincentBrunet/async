import { AstAnnotation } from "../../data/ast/AstAnnotation.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseAnnotation<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstAnnotation,
) {
  if (ast.type) {
    r.recurseType(r, p, ast.type);
  }
}
