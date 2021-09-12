import { AstIdentifier } from "../../../data/ast/AstIdentifier.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseIdentifier(
  scope: BrowsedScope,
  astIdentifier: AstIdentifier,
) {
  scope.propagateName(astIdentifier.name);
}
