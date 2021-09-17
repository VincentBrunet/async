import { AstTypeObject } from "../../data/ast/AstTypeObject.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseTypeObject<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstTypeObject,
) {
  for (const field of ast.fields) {
    r.recurseType(r, p, field.type);
  }
}
