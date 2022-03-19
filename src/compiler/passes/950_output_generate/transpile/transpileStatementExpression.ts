import { AstStatementExpression } from "../../../data/ast/AstStatementExpression.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileStatementExpression(
  pass: RecursorPass,
  ast: AstStatementExpression,
  transpiler: Transpiler,
) {
  transpiler.pushStatement([]);
  pass.recurseExpression(ast.expression);
}
