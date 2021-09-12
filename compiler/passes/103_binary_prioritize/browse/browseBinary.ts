import { AstBinary } from "../../../data/ast/AstBinary.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { browseExpression } from "./browseExpression.ts";

export function browseBinary(
  scope: BrowsedScope,
  astBinary: AstBinary,
) {
  browseExpression(scope, astBinary.expression1);
  browseExpression(scope, astBinary.expression2);
}
