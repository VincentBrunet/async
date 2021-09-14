import { AstExpressionBinary } from "../../../data/ast/expression/AstExpressionBinary.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseExpression } from "./browseExpression.ts";

export function browseBinary(
  scope: BrowsedScope,
  astBinary: AstExpressionBinary,
) {
  browseExpression(scope, astBinary.expression1);
  browseExpression(scope, astBinary.expression2);
}
