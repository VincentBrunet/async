import { AstExpressionCall } from '../../data/ast/AstExpressionCall.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseExpressionCall(r: RecursorPass, ast: AstExpressionCall) {
  r.recurseExpression(ast.callee);
  for (const param of ast.params) {
    r.recurseExpression(param);
  }
}
