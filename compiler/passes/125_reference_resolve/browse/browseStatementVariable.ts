import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { Scope } from "../util/Scope.ts";

export function browseStatementVariable(
  scope: Scope,
  ast: AstStatementVariable,
  next: () => void,
) {
  // Asserts
  const parent = ensure(scope.parent);

  parent.pushVariable(ast);

  next();
}
