import { AstStatementExport } from "../../../data/ast/AstStatementExport.ts";
import { Scope } from "../util/Scope.ts";

export async function browseStatementExport(
  scope: Scope,
  ast: AstStatementExport,
  next: () => Promise<void>,
) {
  ast.resolvedType = ast.annotation.type;
  await next();
  ast.resolvedType = ast.annotation.type ?? ast.expression.resolvedType;
}
