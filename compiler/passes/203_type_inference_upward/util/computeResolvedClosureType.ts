import { AstResolvedClosure } from "../../../data/ast/AstResolvedClosure.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { computeResolvedReferenceType } from "./computeResolvedReferenceType.ts";

export function computeResolvedClosureType(ast: AstResolvedClosure) {
  const reference = ensure(ast.resolvedReference);
  return computeResolvedReferenceType(reference);
}
