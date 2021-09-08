import { AstObject } from "../../../data/ast/AstObject.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeBlock } from "./computeBlock.ts";

export function computeObject(
  parent: ResolveScope,
  astObject: AstObject,
) {
  if (!astObject.block) {
    return;
  }
  const scope = new ResolveScope(parent);
  computeBlock(scope, astObject.block);
}
