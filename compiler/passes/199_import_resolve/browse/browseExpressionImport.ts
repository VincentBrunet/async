import { AstExpressionKind } from "../../../data/ast/AstExpression.ts";
import { AstExpressionImport } from "../../../data/ast/AstExpressionImport.ts";
import { AstExpressionLiteral } from "../../../data/ast/AstExpressionLiteral.ts";
import { AstTypePrimitiveNative } from "../../../data/ast/AstTypePrimitive.ts";
import { triggerCompile } from "../../../pipeline/triggerCompile.ts";

export async function browseExpressionImport(
  scope: null,
  ast: AstExpressionImport,
  next: () => Promise<void>,
) {
  if (ast.expression.kind !== AstExpressionKind.Literal) {
    throw new Error("Unknown import non literal:" + ast.expression.kind);
  }

  const literal = ast.expression.data as AstExpressionLiteral;
  if (literal.native !== AstTypePrimitiveNative.String) {
    throw new Error("Unknown literal non string:" + literal.native);
  }

  ast.resolvedModule = await triggerCompile(literal.value);

  console.log("TEST", literal.value, ast.resolvedModule);

  await next();
}
