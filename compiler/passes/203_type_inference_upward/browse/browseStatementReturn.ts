import { AstStatementReturn } from "../../../data/ast/AstStatementReturn.ts";
import { Scope } from "../util/Scope.ts";

export function browseStatementReturn(
  scope: Scope,
  ast: AstStatementReturn,
  next: () => void,
) {
  ast.resolvedType = ast.annotation.type;
  next();
  ast.resolvedType = ast.annotation.type ?? ast.value.resolvedType;
}
