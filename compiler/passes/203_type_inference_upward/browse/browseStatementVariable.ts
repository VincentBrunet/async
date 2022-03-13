import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { Scope } from "../util/Scope.ts";

export function browseStatementVariable(
  scope: Scope,
  ast: AstStatementVariable,
  next: () => void,
) {
  ast.resolvedType = ast.annotation.type;
  next();
  ast.resolvedType = ast.annotation.type ?? ast.value?.resolvedType;
}
