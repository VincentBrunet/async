import { AstExpressionKind } from "../../../data/ast/AstExpression.ts";
import { AstExpressionLiteral } from "../../../data/ast/AstExpressionLiteral.ts";
import { AstStatementImport } from "../../../data/ast/AstStatementImport.ts";
import { AstTypePrimitiveNative } from "../../../data/ast/AstTypePrimitive.ts";
import { triggerCompile } from "../../../pipeline/triggerCompile.ts";

export async function browseStatementImport(
  scope: null,
  ast: AstStatementImport,
  next: () => Promise<void>,
) {
  if (ast.from.kind !== AstExpressionKind.Literal) {
    throw new Error("Unknown import non literal:" + ast.from.kind);
  }

  const literal = ast.from.data as AstExpressionLiteral;
  if (literal.native !== AstTypePrimitiveNative.String) {
    throw new Error("Unknown literal non string:" + literal.native);
  }

  ast.resolvedModule = await triggerCompile(literal.value);

  await next();
}
