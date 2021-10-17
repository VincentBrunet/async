import { AstStatementReturn } from "../../../data/ast/AstStatementReturn.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export async function transpileStatementReturn(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstStatementReturn,
) {
  transpiler.pushStatement(["return", " "]);
  await pass.recurseExpression(transpiler, ast.value);
}
