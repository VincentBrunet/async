import { AstExpressionTyping } from "../../../data/ast/AstExpressionTyping.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileExpressionTyping(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstExpressionTyping,
) {
  transpiler.pushPart(ast.operator); // TODO
  transpiler.pushPart("(");
  pass.recurseExpression(transpiler, ast.expression);
  transpiler.pushPart("/*");
  //transpiler.pushPart(JSON.stringify(ast.type));
  transpiler.pushPart("*/");
  transpiler.pushPart(")");
}
