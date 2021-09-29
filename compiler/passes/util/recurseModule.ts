import { AstModule } from "../../data/ast/AstModule.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseModule<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstModule,
) {
  for (const statement of ast.statements) {
    await r.recurseStatement(p, statement);
  }
}
