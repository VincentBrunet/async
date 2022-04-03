import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { Scope } from '../util/Scope.ts';

export function browseExpressionFunction(
  ast: AstExpressionFunction,
  scope: Scope,
) {
  // Asserts
  const referenceClosures = ensure(ast.referenceClosures);

  // Closures (resolve and declare)
  for (const referenceClosure of referenceClosures) {
    referenceClosure.resolvedReferenceValue = scope.findReferenceValue(referenceClosure.name);
  }
  for (const referenceClosure of referenceClosures) {
    scope.pushReferenceClosure(referenceClosure);
  }

  // Template params
  for (const param of ast.template.params) {
    scope.pushAnnotationTemplateParam(param);
  }

  // Function params
  for (const astParam of ast.params) {
    if (astParam.name) {
      scope.pushExpressionFunctionParam(astParam);
    }
  }
}
