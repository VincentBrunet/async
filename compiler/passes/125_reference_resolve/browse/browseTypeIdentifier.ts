import { AstTypeIdentifier } from "../../../data/ast/AstTypeIdentifier.ts";
import { Scope } from "../util/Scope.ts";

export function browseTypeIdentifier(
  scope: Scope,
  ast: AstTypeIdentifier,
  next: () => void,
) {
  ast.resolvedReference = scope.findReference(ast.name);
  next();
}
