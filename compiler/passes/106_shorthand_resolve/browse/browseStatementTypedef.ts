import { AstStatementTypedef } from "../../../data/ast/AstStatementTypedef.ts";
import { AstRecursor } from "../../util/AstRecursor.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseStatementTypedef(
  recursor: AstRecursor<BrowsedScope>,
  scope: BrowsedScope,
  ast: AstStatementTypedef,
) {
  scope.pushTypedef(ast);
  recursor.recurseType(recursor, scope, ast.type);
}
