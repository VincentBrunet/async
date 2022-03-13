import { AstStatementImport } from "../../../data/ast/AstStatementImport.ts";
import { Scope } from "../util/Scope.ts";

export function browseStatementImport(
  scope: Scope,
  ast: AstStatementImport,
  next: () => void,
) {
  next();
  scope.propagateImport(ast);
}
