import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseExpressionFunction(
  scope: BrowsedScope,
  ast: AstExpressionFunction,
  next: () => Promise<void>,
) {
  for (const param of ast.template.params) {
    scope.pushTemplateParam(param);
  }
  await next();
}
