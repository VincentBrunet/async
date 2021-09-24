import { AstStatementTypedef } from "../../../data/ast/AstStatementTypedef.ts";

export function browseStatementTypedef(
  scope: undefined,
  ast: AstStatementTypedef,
  next: () => void,
) {
  next();
}
