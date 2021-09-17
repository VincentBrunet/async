import { AstExpressionLiteral } from "../../data/ast/AstExpressionLiteral.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseExpressionLiteral<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstExpressionLiteral,
) {
}
