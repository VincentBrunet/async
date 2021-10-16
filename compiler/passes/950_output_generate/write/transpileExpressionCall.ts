import { AstExpressionCall } from "../../../data/ast/AstExpressionCall.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export async function transpileExpressionCall(
  pass: RecursorPass<Transpiler>,
  transpiler: Transpiler,
  ast: AstExpressionCall,
) {
  transpiler.pushPart("function_call_");
  transpiler.pushPart(ast.params.length.toString());
  transpiler.pushPart("(");
  await pass.recurseExpression(transpiler, ast.callee);
  for (const param of ast.params) {
    transpiler.pushPart(", ");
    await pass.recurseExpression(transpiler, param);
  }
  transpiler.pushPart(")");
}
