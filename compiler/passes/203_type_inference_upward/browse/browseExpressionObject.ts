import { AstExpressionObject } from "../../../data/ast/AstExpressionObject.ts";
import { makeTypeObject } from "../../../lib/typing/makeTypeObject.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionObject(
  scope: BrowsedScope,
  ast: AstExpressionObject,
  next: () => void,
) {
  ast.resolvedType = ast.annotation.type;

  if (ast.resolvedClosures) {
    for (const closure of ast.resolvedClosures) {
      closure.resolvedType = closure.resolvedReference?.data.resolvedType;
    }
  }

  next();

  ast.resolvedType = ast.annotation.type ?? makeTypeObject([], ast); // TODO
}
