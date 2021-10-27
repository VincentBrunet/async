import { AstStatementWhile } from "../../../data/ast/AstStatementWhile.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export async function transpileStatementWhile(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstStatementWhile,
) {
  // condition
  transpiler.pushStatement(["while (TO_BOOLEAN("]);
  await pass.recurseExpression(transpiler, ast.condition);
  transpiler.pushPart("))");
  // content
  await pass.recurseBlock(transpiler, ast.block);
}
