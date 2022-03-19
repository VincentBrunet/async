import { AstExpressionTyping } from "../../../data/ast/AstExpressionTyping.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileExpressionTyping(
  pass: RecursorPass,
  ast: AstExpressionTyping,
  transpiler: Transpiler,
) {
  transpiler.pushStatementPart(ast.operator); // TODO
  transpiler.pushStatementPart("(");
  pass.recurseExpression(ast.expression);
  transpiler.pushStatementPart("/*");
  //transpiler.pushStatementPart(JSON.stringify(ast.type));
  transpiler.pushStatementPart("*/");
  transpiler.pushStatementPart(")");
}
