import { AstExpressionIdentifier } from '../../../data/ast/AstExpressionIdentifier.ts';
import { Scope } from '../util/Scope.ts';

export function browseExpressionIdentifier(
  ast: AstExpressionIdentifier,
  scope: Scope,
) {
  ast.resolvedReferenceValue = scope.findReferenceValue(ast.name);
}
