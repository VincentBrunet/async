import { AstFunction } from "../../../data/ast/AstFunction.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeBlock } from "./computeBlock.ts";

export function computeFunction(
  scope: ResolveScope,
  astFunction: AstFunction,
) {
  const child = new ResolveScope(scope);
  for (const astParam of astFunction.params) {
    child.pushName(astParam.name);
  }
  computeBlock(child, astFunction.block);
  astFunction.closures = child.readClosures();
}
