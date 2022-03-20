import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { ensure } from '../../../lib/errors/ensure.ts';
import { Scope } from '../util/Scope.ts';

export function browseExpressionFunction(
  ast: AstExpressionFunction,
  scope: Scope,
) {
  // Asserts
  const resolvedClosures = ensure(ast.resolvedClosures);

  // Closures (resolve and declare)
  for (const astClosure of resolvedClosures) {
    astClosure.resolvedReference = scope.findReference(astClosure.name);
  }
  for (const astClosure of resolvedClosures) {
    scope.pushClosure(astClosure);
  }

  // Template params
  for (const param of ast.template.params) {
    scope.pushTemplateParam(param);
  }

  // Function params
  for (const astParam of ast.params) {
    if (astParam.name) {
      scope.pushFunctionParam(astParam);
    }
  }
}
