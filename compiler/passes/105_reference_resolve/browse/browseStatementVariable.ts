import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { Scope } from "../util/Scope.ts";

export async function browseStatementVariable(
  scope: Scope,
  ast: AstStatementVariable,
  next: () => Promise<void>,
) {
  scope.parent?.pushVariable(ast);
  await next();
}
