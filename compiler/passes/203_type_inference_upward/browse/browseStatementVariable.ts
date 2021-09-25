import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseStatementVariable(
  scope: BrowsedScope,
  ast: AstStatementVariable,
  next: () => void,
) {
  ast.resolvedType = ast.annotation.type;
  next();
  ast.resolvedType = ast.annotation.type ?? ast.value?.resolvedType;
}
