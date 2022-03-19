import { AstExpressionObject } from '../../data/ast/AstExpressionObject.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseExpressionObject(r: RecursorPass, ast: AstExpressionObject) {
  r.recurseAnnotationType(ast.annotation);
  for (const field of ast.fields) {
    r.recurseAnnotationType(field.annotation);
    r.recurseExpression(field.expression);
  }
}
