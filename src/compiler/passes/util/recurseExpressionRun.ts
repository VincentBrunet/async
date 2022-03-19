import { AstExpressionRun } from '../../data/ast/AstExpressionRun.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseExpressionRun(r: RecursorPass, ast: AstExpressionRun) {
  r.recurseAnnotationType(ast.annotation);
  r.recurseBlock(ast.block);
}
