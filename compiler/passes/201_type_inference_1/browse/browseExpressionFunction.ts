import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";

export function browseExpressionFunction(
  scope: undefined,
  ast: AstExpressionFunction,
  next: () => void,
) {
  next();
}
