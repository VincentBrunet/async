import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { ensure } from '../../../lib/errors/ensure.ts';
import { Scope } from '../util/Scope.ts';

export function browseExpressionFunction(
  next: () => void,
  ast: AstExpressionFunction,
  scope: Scope,
) {
  // Asserts
  const resolvedClosures = ensure(ast.resolvedClosures);

  for (const astClosure of resolvedClosures) {
    astClosure.resolvedReference = scope.findReference(astClosure.name);
  }

  for (const param of ast.template.params) {
    scope.pushTemplateParam(param);
  }

  for (const astClosure of resolvedClosures) {
    scope.pushClosure(astClosure);
  }
  for (const astParam of ast.params) {
    if (astParam.name) {
      scope.pushFunctionParam(astParam);
    }
  }

  next();
}
