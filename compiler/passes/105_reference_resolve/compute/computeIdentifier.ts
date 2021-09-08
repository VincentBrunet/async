import { AstIdentifier } from "../../../data/ast/AstIdentifier.ts";
import { ResolveDeclaration } from "../util/ResolveDeclaration.ts";
import { ResolveScope } from "../util/ResolveScope.ts";

export function computeIdentifier(
  scope: ResolveScope,
  astIdentifier: AstIdentifier,
) {
  let current: ResolveScope | undefined = scope;
  let closure: boolean = false;
  while (current) {
    const declaration = current.findDeclaration(astIdentifier.name);
    if (declaration) {
      astIdentifier.declaration = {
        closure: closure,
        name: declaration.name,
        type: declaration.type,
        param: declaration.param,
        variable: declaration.variable,
      };
      return;
    }
    if (current.needClosure()) {
      closure = true;
    }
    current = current.getParent();
  }
}
