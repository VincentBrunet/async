import { AstStatementTypedef } from "../../../data/ast/AstStatementTypedef.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseStatementTypedef(
  scope: BrowsedScope,
  ast: AstStatementTypedef,
  next: () => void,
) {
  next();
}
