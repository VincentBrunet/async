import { AstStatementReturn } from "../../../data/ast/AstStatementReturn.ts";
import { Tracker } from "../util/Tracker.ts";

export function browseStatementReturn(
  next: () => void,
  ast: AstStatementReturn,
  tracker: Tracker,
) {
  ast.resolvedType = ast.annotation.type;
  next();
  ast.resolvedType = ast.annotation.type ?? ast.value.resolvedType;
}
