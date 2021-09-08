import { AstIdentifier } from "../../../data/ast/AstIdentifier.ts";
import { ResolveScope } from "../util/ResolveScope.ts";

export function computeIdentifier(
  scope: ResolveScope,
  astIdentifier: AstIdentifier,
) {
  scope.propagateName(astIdentifier.name);
}
