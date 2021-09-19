import { AstTypeIdentifier } from "../../data/ast/AstTypeIdentifier.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseTypeIdentifier<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstTypeIdentifier,
) {
  for (const template of ast.templates) {
    r.recurseType(r, p, template);
  }
}
