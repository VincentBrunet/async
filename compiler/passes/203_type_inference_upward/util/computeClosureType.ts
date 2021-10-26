import { AstResolvedClosure } from "../../../data/ast/AstResolvedClosure.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { computeReferenceType } from "./computeReferenceType.ts";

export function computeClosureType(ast: AstResolvedClosure) {
  const reference = ensure(ast.resolvedReference);
  return computeReferenceType(reference);
}
