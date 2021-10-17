import { AstStatementBlock } from "../../data/ast/AstStatementBlock.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseStatementBlock<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementBlock,
) {
  await r.recurseBlock(p, ast.block);
}
