import { AstStatementUnsafe } from "../../../data/ast/AstStatementUnsafe.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export async function transpileStatementUnsafe(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstStatementUnsafe,
) {
  transpiler.pushStatement([]);
  transpiler.pushBlock();
  transpiler.pushStatement([
    ast.content,
  ]);
  transpiler.popBlock();
}
