import { AstStatementExport } from "../../../data/ast/AstStatementExport.ts";
import { Scope } from "../util/Scope.ts";

export function browseStatementExport(
  scope: Scope,
  ast: AstStatementExport,
  next: () => void,
) {
  next();
}
