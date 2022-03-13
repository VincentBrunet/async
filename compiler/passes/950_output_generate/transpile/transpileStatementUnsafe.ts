import { AstStatementUnsafe } from "../../../data/ast/AstStatementUnsafe.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileStatementUnsafe(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstStatementUnsafe,
) {
  transpiler.pushStatement(["/* unsafe */ "]);
  transpiler.pushBlock();
  transpiler.pushStatement(["// start"]);
  transpiler.pushStatement([ast.content]);
  transpiler.pushStatement(["// end"]);
  transpiler.popBlock();
}
