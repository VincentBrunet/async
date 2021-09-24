import { AstExpression } from "../../../data/ast/AstExpression.ts";

export function browseExpression(
  scope: undefined,
  ast: AstExpression,
  next: () => void,
) {
  next();
}
