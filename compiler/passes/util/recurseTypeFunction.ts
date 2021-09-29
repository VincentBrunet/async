import { AstTypeFunction } from "../../data/ast/AstTypeFunction.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseTypeFunction<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstTypeFunction,
) {
  for (const param of ast.params) {
    await r.recurseType(p, param.type);
  }
  await r.recurseType(p, ast.ret);
}
