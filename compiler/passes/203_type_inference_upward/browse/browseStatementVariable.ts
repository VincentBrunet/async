import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseStatementVariable(
  scope: BrowsedScope,
  ast: AstStatementVariable,
  next: () => Promise<void>,
) {
  ast.resolvedType = ast.annotation.type;
  await next();
  ast.resolvedType = ast.annotation.type ?? ast.value?.resolvedType;
}
