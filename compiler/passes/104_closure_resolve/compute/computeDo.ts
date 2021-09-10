import { AstDo } from "../../../data/ast/AstDo.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeBlock } from "./computeBlock.ts";

export function computeDo(
  scope: ResolveScope,
  astDo: AstDo,
) {
  const child = new ResolveScope(scope);
  if (astDo.block) {
    computeBlock(child, astDo.block);
  }
  astDo.closures = child.readClosures();
}
