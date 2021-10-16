import { AstStatementUnsafe } from "../../../data/ast/AstStatementUnsafe.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export async function transpileStatementUnsafe(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstStatementUnsafe,
) {
  transpiler.pushStatement([
    "{",
    " ",
    ast.content,
    " ",
    "}",
  ]);
}
