import { AstExpressionCall } from "../../../data/ast/AstExpressionCall.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileExpressionCall(
  pass: RecursorPass,
  ast: AstExpressionCall,
  transpiler: Transpiler,
) {
  transpiler.pushStatementPart("function_call_");
  transpiler.pushStatementPart(ast.params.length.toString());
  transpiler.pushStatementPart("(");
  pass.recurseExpression(ast.callee);
  for (const param of ast.params) {
    transpiler.pushStatementPart(", ");
    pass.recurseExpression(param);
  }
  transpiler.pushStatementPart(")");
}
