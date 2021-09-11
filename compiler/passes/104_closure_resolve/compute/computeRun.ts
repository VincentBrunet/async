import { AstRun } from "../../../data/ast/AstRun.ts";
import { ResolveScope } from "../util/ResolveScope.ts";
import { computeBlock } from "./computeBlock.ts";

export function computeRun(
  scope: ResolveScope,
  astRun: AstRun,
) {
  const child = new ResolveScope(scope);
  computeBlock(child, astRun.block);
  astRun.closures = child.readClosures();
}
