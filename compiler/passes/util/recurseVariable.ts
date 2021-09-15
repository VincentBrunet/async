import { AstVariable } from "../../data/ast/AstVariable.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseVariable<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstVariable,
) {
  if (ast.value) {
    r.recurseExpression(r, p, ast.value);
  }
}
