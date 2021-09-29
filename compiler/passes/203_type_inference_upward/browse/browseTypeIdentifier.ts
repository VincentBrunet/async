import { AstTypeIdentifier } from "../../../data/ast/AstTypeIdentifier.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseTypeIdentifier(
  scope: BrowsedScope,
  ast: AstTypeIdentifier,
  next: () => Promise<void>,
) {
  await next();
  if (!ast.resolvedShorthand) {
    throw new Error("Shorthand not resolved: " + ast.name);
  }
}
