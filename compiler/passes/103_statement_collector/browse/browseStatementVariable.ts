import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { Scope } from "../util/Scope.ts";

export function browseStatementVariable(
  scope: Scope,
  ast: AstStatementVariable,
  next: () => void,
) {
  next();
  scope.propagateVariable(ast);
}
