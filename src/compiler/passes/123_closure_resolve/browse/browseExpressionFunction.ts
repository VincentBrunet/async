import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { Scope } from '../util/Scope.ts';

export function browseExpressionFunction(
  next: () => void,
  ast: AstExpressionFunction,
  scope: Scope,
) {
  for (const astParam of ast.params) {
    if (astParam.name) {
      scope.pushName(astParam.name);
    }
  }
  next();
  ast.referenceValueClosures = scope.readValueClosures();
}
