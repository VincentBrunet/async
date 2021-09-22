import { AstModule } from "../../data/ast/AstModule.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseModule<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstModule,
) {
  for (const statement of ast.statements) {
    r.recurseStatement(p, statement);
  }
}
