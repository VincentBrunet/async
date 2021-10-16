import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { Scope } from "../util/Scope.ts";

export async function browseStatementVariable(
  scope: Scope,
  ast: AstStatementVariable,
  next: () => Promise<void>,
) {
  ast.resolvedType = ast.annotation.type;
  await next();
  ast.resolvedType = ast.annotation.type ?? ast.value?.resolvedType;
}
