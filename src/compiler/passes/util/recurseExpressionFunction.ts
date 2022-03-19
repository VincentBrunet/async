import { AstExpressionFunction } from '../../data/ast/AstExpressionFunction.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseExpressionFunction(r: RecursorPass, ast: AstExpressionFunction) {
  r.recurseAnnotationTemplate(ast.template);
  for (const param of ast.params) {
    r.recurseAnnotationType(param.annotation);
  }
  r.recurseAnnotationType(ast.ret);
  r.recurseBlock(ast.block);
}
