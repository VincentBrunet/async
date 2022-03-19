import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { Scope } from "../util/Scope.ts";

export function browseStatementVariable(
  next: () => void,
  ast: AstStatementVariable,
  scope: Scope,
) {
  ensure(scope.parent).pushName(ast.name);
  next();
}
