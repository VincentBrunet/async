import { AstStatementReturn } from "../../../data/ast/AstStatementReturn.ts";
import { Scope } from "../util/Scope.ts";

export async function browseStatementReturn(
  scope: Scope,
  ast: AstStatementReturn,
  next: () => Promise<void>,
) {
  await next();
  scope.propagateReturn(ast);
}
