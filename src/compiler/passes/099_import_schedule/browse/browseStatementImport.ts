import { AstExpressionKind } from "../../../data/ast/AstExpression.ts";
import { AstExpressionLiteral } from "../../../data/ast/AstExpressionLiteral.ts";
import { AstModule } from "../../../data/ast/AstModule.ts";
import { AstStatementImport } from "../../../data/ast/AstStatementImport.ts";
import { AstTypePrimitiveNative } from "../../../data/ast/AstTypePrimitive.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { combinedUrl } from "../../../lib/io/combinedUrl.ts";
import { scheduleImport } from "../../../pipeline/compile.ts";

export function browseStatementImport(
  next: () => void,
  ast: AstStatementImport,
  scope: URL,
) {
  if (ast.url.kind !== AstExpressionKind.Literal) {
    throw new Error("Unknown import non literal:" + ast.url.kind);
  }

  const literal = ast.url.data as AstExpressionLiteral;
  if (literal.native !== AstTypePrimitiveNative.String) {
    throw new Error("Unknown literal non string:" + literal.native);
  }

  scheduleImport(
    combinedUrl(
      literal.value,
      scope,
    ),
    (resolvedModule: AstModule) => {
      ast.resolvedModule = resolvedModule;
    },
  );

  next();
}
