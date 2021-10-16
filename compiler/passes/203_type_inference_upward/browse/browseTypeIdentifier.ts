import { AstTypeIdentifier } from "../../../data/ast/AstTypeIdentifier.ts";
import { Scope } from "../util/Scope.ts";

export async function browseTypeIdentifier(
  scope: Scope,
  ast: AstTypeIdentifier,
  next: () => Promise<void>,
) {
  await next();
  if (!ast.resolvedShorthand) {
    throw new Error("Shorthand not resolved: " + ast.name);
  }
}
