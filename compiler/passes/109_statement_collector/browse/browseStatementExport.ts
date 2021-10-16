import { AstStatementExport } from "../../../data/ast/AstStatementExport.ts";
import { Scope } from "../util/Scope.ts";

export async function browseStatementExport(
  scope: Scope,
  ast: AstStatementExport,
  next: () => Promise<void>,
) {
  await next();
  scope.propagateExport(ast);
}
