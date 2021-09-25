import { AstTypePrimitive } from "../../data/ast/AstTypePrimitive.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseTypePrimitive<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstTypePrimitive,
) {
  for (const param of ast.params) {
    r.recurseType(p, param);
  }
}
