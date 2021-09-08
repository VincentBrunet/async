import { AstModule } from "../../../data/ast/AstModule.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeStatement } from "./computeStatement.ts";

export function computeModule(scope: ResolveScope, astModule: AstModule) {
  const child = new ResolveScope(scope);
  for (const astStatement of astModule.statements) {
    computeStatement(child, astStatement);
  }
}
