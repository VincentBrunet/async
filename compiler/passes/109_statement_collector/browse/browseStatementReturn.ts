import { AstStatementReturn } from "../../../data/ast/AstStatementReturn.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseStatementReturn(
  scope: BrowsedScope,
  ast: AstStatementReturn,
  next: () => Promise<void>,
) {
  await next();
  scope.propagateReturn(ast);
}
