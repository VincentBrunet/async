import { AstStatementTypedef } from "../../../data/ast/AstStatementTypedef.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { Scope } from "../util/Scope.ts";

export function browseStatementTypedef(
  next: () => void,
  ast: AstStatementTypedef,
  scope: Scope,
) {
  // Asserts
  const parent = ensure(scope.parent);

  parent.pushTypedef(ast);

  for (const param of ast.template.params) {
    scope.pushTemplateParam(param);
  }

  next();
}
