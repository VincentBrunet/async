import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { Scope } from '../util/Scope.ts';

export function browseExpressionFunction(
  ast: AstExpressionFunction,
  scope: Scope,
) {
  // Asserts
  const referenceValueClosures = ensure(ast.referenceValueClosures);

  // ValueClosures (resolve and declare)
  for (const referenceValueClosure of referenceValueClosures) {
    referenceValueClosure.resolvedReferenceValue = scope.findReferenceValue(referenceValueClosure.name);
  }
  for (const referenceValueClosure of referenceValueClosures) {
    scope.pushReferenceValueClosure(referenceValueClosure);
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
