import { AstTypeIdentifier } from "../../../data/ast/AstTypeIdentifier.ts";

export function browseTypeIdentifier(
  scope: undefined,
  ast: AstTypeIdentifier,
  next: () => void,
) {
  next();
  if (ast.resolvedShorthand) {
    throw new Error("Shorthand not resolved");
  }
}
