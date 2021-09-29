import { AstTypeBinary } from "../../data/ast/AstTypeBinary.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseTypeBinary<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstTypeBinary,
) {
  await r.recurseType(p, ast.type1);
  await r.recurseType(p, ast.type2);
}
