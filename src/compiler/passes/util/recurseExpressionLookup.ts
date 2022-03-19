import { AstExpressionLookup } from '../../data/ast/AstExpressionLookup.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseExpressionLookup(r: RecursorPass, ast: AstExpressionLookup) {
  r.recurseExpression(ast.expression);
}
