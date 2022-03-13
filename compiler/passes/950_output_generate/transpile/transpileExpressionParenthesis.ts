import { AstExpressionParenthesis } from "../../../data/ast/AstExpressionParenthesis.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileExpressionParenthesis(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstExpressionParenthesis,
) {
  transpiler.pushPart("(");
  pass.recurseExpression(transpiler, ast.expression);
  transpiler.pushPart(")");
}
