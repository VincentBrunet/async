import { AstWhile } from "../../../data/ast/AstWhile.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeBlock } from "./computeBlock.ts";
import { computeExpression } from "./computeExpression.ts";

export function computeWhile(
  scope: ResolveScope,
  astWhile: AstWhile,
) {
  computeExpression(scope, astWhile.expression);
  computeBlock(scope, astWhile.block);
}
