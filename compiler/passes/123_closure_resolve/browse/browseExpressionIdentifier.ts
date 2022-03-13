import { AstExpressionIdentifier } from "../../../data/ast/AstExpressionIdentifier.ts";
import { Scope } from "../util/Scope.ts";

export function browseExpressionIdentifier(
  scope: Scope,
  ast: AstExpressionIdentifier,
  next: () => void,
) {
  scope.propagateName(ast.name);
  next();
}
