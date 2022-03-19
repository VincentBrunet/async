import { AstExpressionBinary } from "../../../data/ast/AstExpressionBinary.ts";
import { Tracker } from "../util/Tracker.ts";

export function browseExpressionBinary(
  next: () => void,
  ast: AstExpressionBinary,
  tracker: Tracker,
) {
  next();
  ast.resolvedType = ast.expression2.resolvedType; // TODO
}
