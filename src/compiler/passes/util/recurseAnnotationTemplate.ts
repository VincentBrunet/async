import { AstAnnotationTemplate } from '../../data/ast/AstAnnotationTemplate.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseAnnotationTemplate(r: RecursorPass, ast: AstAnnotationTemplate) {
  for (const param of ast.params) {
    r.recurseAnnotationType(param.annotation);
  }
}
