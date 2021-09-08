import { AstModule } from "../../data/ast/AstModule.ts";
import { computeModule } from "./compute/computeModule.ts";
import { ResolveScope } from "./util/ResolveScope.ts";

export function applyAstReferenceResolve(astModule: AstModule) {
  const scope = new ResolveScope();
  computeModule(scope, astModule);
}
