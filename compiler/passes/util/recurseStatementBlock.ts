import { AstStatementBlock } from "../../data/ast/AstStatementBlock.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseStatementBlock<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementBlock,
) {
  r.recurseBlock(p, ast.block);
}
