import { AstBlock } from "../../../data/ast/AstBlock.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeStatement } from "./computeStatement.ts";

export function computeBlock(
  scope: ResolveScope,
  astBlock: AstBlock,
) {
  for (const astStatement of astBlock.statements) {
    computeStatement(scope, astStatement);
  }
}
