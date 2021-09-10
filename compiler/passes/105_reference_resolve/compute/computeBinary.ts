import { AstBinary } from "../../../data/ast/AstBinary.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeExpression } from "./computeExpression.ts";

export function computeBinary(
  scope: ResolveScope,
  astBinary: AstBinary,
) {
  computeExpression(scope, astBinary.expression1);
  computeExpression(scope, astBinary.expression2);
}
