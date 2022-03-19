import { AstTypeIdentifier } from "../../../data/ast/AstTypeIdentifier.ts";
import { Scope } from "../util/Scope.ts";

export function browseTypeIdentifier(
  next: () => void,
  ast: AstTypeIdentifier,
  scope: Scope,
) {
  ast.resolvedReference = scope.findReference(ast.name);
  next();
}
