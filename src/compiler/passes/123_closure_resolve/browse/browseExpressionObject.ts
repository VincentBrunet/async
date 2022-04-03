import { AstExpressionObject } from '../../../data/ast/AstExpressionObject.ts';
import { Scope } from '../util/Scope.ts';

export function browseExpressionObject(
  next: () => void,
  ast: AstExpressionObject,
  scope: Scope,
) {
  next();
  ast.referenceClosures = scope.readClosures();
}
