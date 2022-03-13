import { AstExpressionKind } from "../../../data/ast/AstExpression.ts";
import { AstExpressionLiteral } from "../../../data/ast/AstExpressionLiteral.ts";
import { AstModule } from "../../../data/ast/AstModule.ts";
import { AstStatementImport } from "../../../data/ast/AstStatementImport.ts";
import { AstTypePrimitiveNative } from "../../../data/ast/AstTypePrimitive.ts";
import { combinedUrl } from "../../../lib/io/combinedUrl.ts";
import { scheduleImport } from "../../../pipeline/compile.ts";

export function browseStatementImport(
  scope: AstModule,
  ast: AstStatementImport,
  next: () => void,
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
      scope.sourceToken.sourceCode.sourceUrl,
    ),
    (module: AstModule) => {
      ast.resolvedModule = module;
    },
  );

  next();
}
