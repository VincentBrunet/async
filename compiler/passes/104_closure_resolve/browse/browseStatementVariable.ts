import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { AstRecursor } from "../../util/AstRecursor.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseStatementVariable(
  recursor: AstRecursor<BrowsedScope>,
  scope: BrowsedScope,
  ast: AstStatementVariable,
) {
  scope.pushName(ast.name);
  if (ast.value) {
    recursor.recurseExpression(recursor, scope, ast.value);
  }
}
