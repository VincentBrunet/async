import { AstModule } from "../../data/ast/AstModule.ts";
import { computeModule } from "./compute/computeModule.ts";
import { ResolveScope } from "./util/ResolveScope.ts";

export function applyAstIdentifierResolve(astModule: AstModule) {
  const scope = new ResolveScope(true);
  computeModule(scope, astModule);
}
