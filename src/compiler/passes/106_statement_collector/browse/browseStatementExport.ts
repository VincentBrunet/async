import { AstStatementExport } from "../../../data/ast/AstStatementExport.ts";
import { Scope } from "../util/Scope.ts";

export function browseStatementExport(
  next: () => void,
  ast: AstStatementExport,
  scope: Scope,
) {
  next();
  scope.propagateExport(ast);
}
