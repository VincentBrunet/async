import { AstStatementBlock } from "../../../data/ast/AstStatementBlock.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export async function transpileStatementBlock(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstStatementBlock,
) {
  transpiler.pushStatement(["/* user defined block */ "]);
  await pass.recurseBlock(transpiler, ast.block);
}
