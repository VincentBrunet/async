import { AstExpressionFunction } from "../../data/ast/AstExpressionFunction.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseExpressionFunction<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionFunction,
) {
  await r.recurseAnnotationTemplate(p, ast.template);
  for (const param of ast.params) {
    await r.recurseAnnotationType(p, param.annotation);
  }
  await r.recurseAnnotationType(p, ast.ret);
  await r.recurseBlock(p, ast.block);
}
