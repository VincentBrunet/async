import { AstStatementExpression } from "../../../data/ast/AstStatementExpression.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileStatementExpression(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstStatementExpression,
) {
  transpiler.pushStatement([]);
  pass.recurseExpression(transpiler, ast.expression);
}
