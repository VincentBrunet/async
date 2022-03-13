import { AstExpressionObject } from "../../../data/ast/AstExpressionObject.ts";
import { Scope } from "../util/Scope.ts";

export function browseExpressionObject(
  scope: Scope,
  ast: AstExpressionObject,
  next: () => void,
) {
  next();
  ast.resolvedClosures = scope.readClosures();
}
