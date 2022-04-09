import { AstStatementReturn } from "../../../data/ast/AstStatementReturn.ts";
import { Scope } from "../util/Scope.ts";

export function browseStatementReturn(
  next: () => void,
  ast: AstStatementReturn,
  scope: Scope,
) {
  next();
  scope.propagateReturn(ast);
}
