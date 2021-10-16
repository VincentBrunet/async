import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { Scope } from "../util/Scope.ts";

export async function browseExpressionFunction(
  scope: Scope,
  ast: AstExpressionFunction,
  next: () => Promise<void>,
) {
  for (const param of ast.template.params) {
    scope.pushTemplateParam(param);
  }
  await next();
}
