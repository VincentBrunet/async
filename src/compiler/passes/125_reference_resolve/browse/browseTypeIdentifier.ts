import { AstTypeIdentifier } from '../../../data/ast/AstTypeIdentifier.ts';
import { Scope } from '../util/Scope.ts';

export function browseTypeIdentifier(
  ast: AstTypeIdentifier,
  scope: Scope,
) {
  // Find closest name
  ast.resolvedReferenceType = scope.findReferenceType(ast.name);
}
