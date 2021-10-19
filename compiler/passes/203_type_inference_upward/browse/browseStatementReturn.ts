import { AstStatementReturn } from "../../../data/ast/AstStatementReturn.ts";
import { Scope } from "../util/Scope.ts";

export async function browseStatementReturn(
  scope: Scope,
  ast: AstStatementReturn,
  next: () => Promise<void>,
) {
  ast.resolvedType = ast.annotation.type;
  await next();
  ast.resolvedType = ast.annotation.type ?? ast.value.resolvedType;
}
