import { AstModule } from "../../../data/ast/AstModule.ts";
import { AstRecursor } from "../../util/AstRecursor.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseModule(
  recursor: AstRecursor<BrowsedScope>,
  scope: BrowsedScope,
  ast: AstModule,
) {
  const child = new BrowsedScope(scope);
  for (const astStatement of ast.statements) {
    recursor.recurseStatement(recursor, child, astStatement);
  }
}
