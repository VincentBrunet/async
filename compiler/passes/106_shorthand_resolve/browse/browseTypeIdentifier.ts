import { AstTypeIdentifier } from "../../../data/ast/AstTypeIdentifier.ts";
import { Scope } from "../util/Scope.ts";

export async function browseTypeIdentifier(
  scope: Scope,
  ast: AstTypeIdentifier,
  next: () => Promise<void>,
) {
  ast.resolvedShorthand = scope.findShorthand(ast.name);
  await next();
}
