import { AstExpressionParenthesis } from "../../../data/ast/AstExpressionParenthesis.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileExpressionParenthesis(
  pass: RecursorPass,
  ast: AstExpressionParenthesis,
  transpiler: Transpiler,
) {
  transpiler.pushStatementPart("(");
  pass.recurseExpression(ast.expression);
  transpiler.pushStatementPart(")");
}
