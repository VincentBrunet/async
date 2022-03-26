import { AstStatementTypedef } from '../../../data/ast/AstStatementTypedef.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { Scope } from '../util/Scope.ts';

export function browseStatementTypedef(
  ast: AstStatementTypedef,
  scope: Scope,
) {
  // Asserts
  const parent = ensure(scope.parent);

  // Typedef in parent scope
  parent.pushStatementTypedef(ast);

  // Params in child scope
  for (const param of ast.template.params) {
    scope.pushAnnotationTemplateParam(param);
  }
}
