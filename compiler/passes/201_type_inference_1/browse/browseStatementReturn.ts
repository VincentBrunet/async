import { AstStatementReturn } from "../../../data/ast/AstStatementReturn.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseStatementReturn(
  scope: BrowsedScope,
  ast: AstStatementReturn,
  next: () => void,
) {
  next();
}
