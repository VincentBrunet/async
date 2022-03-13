import { AstStatementWhile } from "../../../data/ast/AstStatementWhile.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileStatementWhile(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstStatementWhile,
) {
  // condition
  transpiler.pushStatement(["while (TO_BOOLEAN("]);
  pass.recurseExpression(transpiler, ast.condition);
  transpiler.pushPart("))");
  // content
  pass.recurseBlock(transpiler, ast.block);
}
