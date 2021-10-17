import { AstModule } from "../../data/ast/AstModule.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseModule<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstModule,
) {
  await r.recurseBlock(p, ast.block);
}
