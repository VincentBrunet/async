import { AstModule } from "../../../data/ast/AstModule.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeStatement } from "./computeStatement.ts";

export function computeModule(parent: ResolveScope, astModule: AstModule) {
  const scope = new ResolveScope(true, parent);
  for (const astStatement of astModule.statements) {
    computeStatement(scope, astStatement);
  }
}
