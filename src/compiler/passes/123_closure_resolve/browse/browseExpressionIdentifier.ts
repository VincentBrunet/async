import { AstExpressionIdentifier } from "../../../data/ast/AstExpressionIdentifier.ts";
import { Scope } from "../util/Scope.ts";

export function browseExpressionIdentifier(
  next: () => void,
  ast: AstExpressionIdentifier,
  scope: Scope,
) {
  scope.propagateName(ast.name);
  next();
}
