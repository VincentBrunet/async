import { AstStatementExpression } from "../../../data/ast/AstStatementExpression.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export async function transpileStatementExpression(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstStatementExpression,
) {
  transpiler.pushStatement([]);
  await pass.recurseExpression(transpiler, ast.expression);
}
