import { AstTypeBinary } from "../../data/ast/AstTypeBinary.ts";

export function recurseTypeBinary<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstTypeBinary,
) {
  r.recurseType(p, ast.type1);
  r.recurseType(p, ast.type2);
}
