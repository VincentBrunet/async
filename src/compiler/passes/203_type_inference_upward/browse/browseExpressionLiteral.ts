import { AstExpressionLiteral } from "../../../data/ast/AstExpressionLiteral.ts";
import { makeTypePrimitive } from "../../../lib/typing/makeTypePrimitive.ts";
import { Tracker } from "../util/Tracker.ts";

export function browseExpressionLiteral(
  next: () => void,
  ast: AstExpressionLiteral,
  tracker: Tracker,
) {
  next();
  ast.resolvedType = makeTypePrimitive(ast.native, [], ast);
}
