import { AstExpressionIdentifier } from "../../data/ast/AstExpressionIdentifier.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseExpressionIdentifier<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstExpressionIdentifier,
): AstExpressionIdentifier {
  return ast;
}
