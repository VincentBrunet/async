import { AstModule } from "../../../data/ast/AstModule.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseStatement } from "./browseStatement.ts";

export function browseModule(scope: BrowsedScope, astModule: AstModule) {
  const child = new BrowsedScope(scope);
  for (const astStatement of astModule.statements) {
    browseStatement(child, astStatement);
  }
}
