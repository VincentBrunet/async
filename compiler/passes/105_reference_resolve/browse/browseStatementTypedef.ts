import { AstStatementTypedef } from "../../../data/ast/AstStatementTypedef.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { Scope } from "../util/Scope.ts";

export async function browseStatementTypedef(
  scope: Scope,
  ast: AstStatementTypedef,
  next: () => Promise<void>,
) {
  // Asserts
  const parent = ensure(scope.parent);

  parent.pushTypedef(ast);

  for (const param of ast.template.params) {
    scope.pushTemplateParam(param);
  }

  await next();
}
