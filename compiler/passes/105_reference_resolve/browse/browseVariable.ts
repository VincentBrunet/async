import { AstVariable } from "../../../data/ast/AstVariable.ts";
import { AstRecursor } from "../../util/AstRecursor.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseVariable(
  recursor: AstRecursor<BrowsedScope>,
  scope: BrowsedScope,
  ast: AstVariable,
) {
  scope.pushVariable(ast);
  if (ast.value) {
    recursor.recurseExpression(recursor, scope, ast.value);
  }
}
