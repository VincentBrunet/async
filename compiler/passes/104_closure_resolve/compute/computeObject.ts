import { AstObject } from "../../../data/ast/AstObject.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeBlock } from "./computeBlock.ts";

export function computeObject(
  scope: ResolveScope,
  astObject: AstObject,
) {
  const child = new ResolveScope(scope);
  if (astObject.block) {
    computeBlock(child, astObject.block);
  }
  astObject.closures = child.readClosures();
}
