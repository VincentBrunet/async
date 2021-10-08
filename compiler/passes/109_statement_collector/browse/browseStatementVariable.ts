import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseStatementVariable(
  scope: BrowsedScope,
  ast: AstStatementVariable,
  next: () => Promise<void>,
) {
  await next();
  scope.propagateVariable(ast);
}