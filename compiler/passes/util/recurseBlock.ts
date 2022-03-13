import { AstBlock } from "../../data/ast/AstBlock.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseBlock<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstBlock,
) {
  for (const statement of ast.statements) {
    r.recurseStatement(p, statement);
  }
}
