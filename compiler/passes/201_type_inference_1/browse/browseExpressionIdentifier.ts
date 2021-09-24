import { AstExpressionIdentifier } from "../../../data/ast/AstExpressionIdentifier.ts";

export function browseExpressionIdentifier(
  scope: undefined,
  ast: AstExpressionIdentifier,
  next: () => void,
) {
  next();
  if (ast.resolvedReference === undefined) {
    throw new Error("Identifier unresolved");
  }
  ast.resolvedType = ast.resolvedReference;
}
