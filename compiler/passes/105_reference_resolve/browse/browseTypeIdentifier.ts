import { AstTypeIdentifier } from "../../../data/ast/AstTypeIdentifier.ts";
import { Scope } from "../util/Scope.ts";

export async function browseTypeIdentifier(
  scope: Scope,
  ast: AstTypeIdentifier,
  next: () => Promise<void>,
) {
  ast.resolvedReference = scope.findReference(ast.name);
  await next();
}
