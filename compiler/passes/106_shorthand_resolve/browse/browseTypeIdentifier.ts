import { AstTypeIdentifier } from "../../../data/ast/AstTypeIdentifier.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseTypeIdentifier(
  scope: BrowsedScope,
  ast: AstTypeIdentifier,
  next: () => Promise<void>,
) {
  ast.resolvedShorthand = scope.findShorthand(ast.name);
  await next();
}
