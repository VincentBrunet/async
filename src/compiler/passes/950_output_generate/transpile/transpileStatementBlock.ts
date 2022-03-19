import { AstStatementBlock } from "../../../data/ast/AstStatementBlock.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileStatementBlock(
  pass: RecursorPass,
  ast: AstStatementBlock,
  transpiler: Transpiler,
) {
  transpiler.pushStatement(["/* user defined block */"]);
  pass.recurseBlock(ast.block);
}
