import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionFunction(
  scope: BrowsedScope,
  ast: AstExpressionFunction,
  next: () => void,
) {
  for (const param of ast.template.params) {
    scope.pushTemplateParam(param);
  }
  next();
}
