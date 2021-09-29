import { AstTypePrimitive } from "../../data/ast/AstTypePrimitive.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseTypePrimitive<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstTypePrimitive,
) {
  for (const param of ast.params) {
    await r.recurseType(p, param);
  }
}
