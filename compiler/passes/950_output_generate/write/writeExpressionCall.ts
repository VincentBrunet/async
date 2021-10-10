import { AstExpressionCall } from "../../../data/ast/AstExpressionCall.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function writeExpressionCall(
  pass: RecursorPass<BrowsedScope>,
  scope: BrowsedScope,
  ast: AstExpressionCall,
) {
  scope.pushStatementPart("function_call_");
  scope.pushStatementPart(ast.params.length.toString());
  scope.pushStatementPart("(");
  pass.recurseExpression(scope, ast.callee);
  for (const param of ast.params) {
    scope.pushStatementPart(", ");
    pass.recurseExpression(scope, param);
  }
  scope.pushStatementPart(")");
}
