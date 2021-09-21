import { AstAnnotationType } from "../../data/ast/AstAnnotationType.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseAnnotationType<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstAnnotationType,
) {
  if (ast.type) {
    r.recurseType(r, p, ast.type);
  }
}
