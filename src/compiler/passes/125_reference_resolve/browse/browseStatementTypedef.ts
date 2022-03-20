import { AstStatementTypedef } from '../../../data/ast/AstStatementTypedef.ts';
import { ensure } from '../../../lib/errors/ensure.ts';
import { Scope } from '../util/Scope.ts';

export function browseStatementTypedef(
  ast: AstStatementTypedef,
  scope: Scope,
) {
  // Asserts
  const parent = ensure(scope.parent);

  // Typedef in parent scope
  parent.pushTypedef(ast);

  // Params in child scope
  for (const param of ast.template.params) {
    scope.pushTemplateParam(param);
  }
}
