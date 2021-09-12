import { AstModule } from "../../data/ast/AstModule.ts";
import { browseModule } from "./browse/browseModule.ts";
import { BrowsedScope } from "./util/BrowsedScope.ts";

export function applyAstBinaryPrioritize(astModule: AstModule) {
  const scope = new BrowsedScope();
  browseModule(scope, astModule);
}
